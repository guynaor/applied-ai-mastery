#Requires -Version 5.1
<#
.SYNOPSIS
    Sets up FreeCAD, the FreeCAD MCP and Claude Desktop on Windows for session 5.

.DESCRIPTION
    Route 2 of the session 5 setup asks a learner to install four separate things
    by hand: FreeCAD, Claude Desktop, uv, and the freecad-mcp addon -- and the
    addon's own instructions start with "clone the repository", which most
    learners on this course cannot do because they have no git. This script does
    the same four things without a single developer tool. GitHub serves any
    repository as a plain ZIP, so git is never actually needed to obtain files.

    Every step checks before it acts and is safe to run twice. Nothing is
    overwritten in place: an existing addon folder is moved aside with a
    timestamp, and claude_desktop_config.json is backed up and then MERGED, so
    any other MCP servers the learner already has keep working.

    The addon's RPC server is off by default and normally started by a button
    inside FreeCAD. This script switches on the addon's own auto-start setting
    instead, so opening FreeCAD is enough. The server still listens on
    127.0.0.1 only -- the addon's separate remote-access setting is untouched.

.PARAMETER Verify
    Check an existing setup instead of installing. Reports on all four pieces
    and probes the RPC port, with the reason it is closed when it is.

.PARAMETER SkipApps
    Do not install FreeCAD or Claude Desktop, only the MCP plumbing. For anyone
    who already has both and would rather the script left them alone.

.PARAMETER Ref
    Branch or tag of neka-nat/freecad-mcp to install. Defaults to main.

.EXAMPLE
    .\session-05-freecad-windows.ps1

.EXAMPLE
    .\session-05-freecad-windows.ps1 -Verify

.LINK
    https://github.com/neka-nat/freecad-mcp
#>
[CmdletBinding()]
param(
    [switch]$Verify,
    [switch]$SkipApps,
    [string]$Ref = 'main'
)

$ErrorActionPreference = 'Stop'

# --- constants ---------------------------------------------------------------

$AddonFolderName = 'FreeCADMCP'
$AddonZipUrl     = "https://codeload.github.com/neka-nat/freecad-mcp/zip/refs/heads/$Ref"
$RpcHost         = '127.0.0.1'
$RpcPort         = 9875
$ClaudeConfigDir = Join-Path $env:APPDATA 'Claude'
$ClaudeConfig    = Join-Path $ClaudeConfigDir 'claude_desktop_config.json'
$FreeCadAppData  = Join-Path $env:APPDATA 'FreeCAD'
$AddonSettings   = 'freecad_mcp_settings.json'
$Stamp           = Get-Date -Format 'yyyyMMdd-HHmmss'

# Output is deliberately ASCII only. Windows PowerShell still opens on codepage
# 437 on plenty of machines, and a checkmark arrives there as mojibake -- which
# on a setup script reads as "it broke".
function Write-Head([string]$Text) {
    Write-Host ''
    Write-Host $Text -ForegroundColor Cyan
    Write-Host ('-' * $Text.Length) -ForegroundColor DarkGray
}
function Write-Ok([string]$Text)   { Write-Host "[ OK ] $Text" -ForegroundColor Green }
function Write-Skip([string]$Text) { Write-Host "[ -- ] $Text" -ForegroundColor DarkGray }
function Write-Work([string]$Text) { Write-Host "[ .. ] $Text" -ForegroundColor Yellow }
function Write-Bad([string]$Text)  { Write-Host "[FAIL] $Text" -ForegroundColor Red }
function Write-Note([string]$Text) { Write-Host "       $Text" -ForegroundColor DarkGray }

function Stop-WithMessage([string]$Step, [string]$Problem, [string]$WhatToDo) {
    Write-Host ''
    Write-Bad "$Step"
    Write-Host ''
    Write-Host "  What went wrong: $Problem"
    Write-Host "  What to do:      $WhatToDo"
    Write-Host ''
    Write-Host '  Nothing else was changed. You can run this script again once that is sorted.'
    Write-Host ''
    exit 1
}

# --- small helpers -----------------------------------------------------------

function Test-CommandExists([string]$Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

# Windows PowerShell 5.1 turns each stderr line of a native program into an
# error record once stderr is redirected, and under ErrorActionPreference Stop
# the first one is fatal. uv and winget both write ordinary progress to stderr,
# so "Downloading cryptography" killed a working install. Native programs are
# judged by their exit code instead -- read $LASTEXITCODE after calling this.
# Output goes to Out-Host so it shows on screen rather than becoming this
# function's return value.
function Invoke-Native([scriptblock]$Command) {
    $previous = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        & $Command | Out-Host
    } finally {
        $ErrorActionPreference = $previous
    }
}

# No BOM. Claude Desktop reads plain UTF-8, and the FreeCAD addon reads its
# settings with Python's json.load, which rejects a BOM and then silently falls
# back to its defaults -- so a BOM would look like the setting was ignored.
function Write-JsonFile([string]$Path, $Object) {
    $json = $Object | ConvertTo-Json -Depth 20
    [System.IO.File]::WriteAllText($Path, $json, (New-Object System.Text.UTF8Encoding $false))
}

# winget puts new executables on PATH, but only for shells started afterwards.
# Re-reading PATH from the registry lets this same run use what it just installed.
function Update-PathFromRegistry {
    $parts = @(
        [Environment]::GetEnvironmentVariable('Path', 'Machine')
        [Environment]::GetEnvironmentVariable('Path', 'User')
        (Join-Path $env:USERPROFILE '.local\bin')   # where uv's own installer lands
    ) | Where-Object { $_ }
    $env:Path = ($parts -join ';')
}

function Get-InstalledApp([string]$NamePattern) {
    $keys = @(
        'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*'
        'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*'
        'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*'
    )
    return Get-ItemProperty $keys -ErrorAction SilentlyContinue |
        Where-Object { $_.DisplayName -like $NamePattern } |
        Select-Object -First 1
}

function Find-FreeCadExe {
    # Built one at a time rather than as one array: Join-Path throws on a null
    # root, and any of these variables can be missing.
    $candidates = @()
    if ($env:ProgramFiles)        { $candidates += (Join-Path $env:ProgramFiles 'FreeCAD*\bin\FreeCAD.exe') }
    if (${env:ProgramFiles(x86)}) { $candidates += (Join-Path ${env:ProgramFiles(x86)} 'FreeCAD*\bin\FreeCAD.exe') }
    if ($env:LOCALAPPDATA)        { $candidates += (Join-Path $env:LOCALAPPDATA 'Programs\FreeCAD*\bin\FreeCAD.exe') }

    foreach ($pattern in $candidates) {
        $hit = Get-ChildItem $pattern -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($hit) { return $hit.FullName }
    }

    $app = Get-InstalledApp 'FreeCAD*'
    if ($app -and $app.InstallLocation) {
        $exe = Join-Path $app.InstallLocation 'bin\FreeCAD.exe'
        if (Test-Path $exe) { return $exe }
    }
    return $null
}

function Install-WithWinget([string]$Id, [string]$Label) {
    if (-not (Test-CommandExists 'winget')) {
        Stop-WithMessage `
            "Cannot install $Label automatically" `
            'winget, the Windows package installer, is not available on this machine.' `
            'Install "App Installer" from the Microsoft Store, then run this script again. Or install the apps by hand and re-run with -SkipApps.'
    }

    Write-Work "Installing $Label. Windows may ask your permission -- say yes."
    Invoke-Native {
        winget install --id $Id --exact --source winget `
            --accept-package-agreements --accept-source-agreements --disable-interactivity
    }
    $code = $LASTEXITCODE

    # 0 is success. -1978335189 is winget's "already installed, nothing to do",
    # which is a success for our purposes and reachable when a different
    # installer put the app there.
    if ($code -ne 0 -and $code -ne -1978335189) {
        Stop-WithMessage `
            "Installing $Label failed" `
            "winget stopped with code $code." `
            "Install $Label by hand from its own website, then run this script again with -SkipApps."
    }
    Update-PathFromRegistry
    Write-Ok "$Label installed."
}

# FreeCAD 1.1 keeps its user files in %APPDATA%\FreeCAD\v1-1\, and that folder
# does not exist until FreeCAD has been launched once. A script that installs
# FreeCAD and then looks for the folder finds nothing, so derive the version
# from the installed program and create the folder ahead of first launch.
function Resolve-FreeCadModDir {
    if (Test-Path $FreeCadAppData) {
        $versioned = Get-ChildItem $FreeCadAppData -Directory -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -match '^v\d+([-.]\d+)?$' } |
            Sort-Object { [version]($_.Name.Substring(1) -replace '-', '.') } -Descending |
            Select-Object -First 1
        if ($versioned) {
            return (Join-Path $versioned.FullName 'Mod')
        }
        if (Test-Path (Join-Path $FreeCadAppData 'Mod')) {
            return (Join-Path $FreeCadAppData 'Mod')   # FreeCAD 1.0 and earlier
        }
    }

    $exe = Find-FreeCadExe
    if ($exe) {
        $version = (Get-Item $exe).VersionInfo.ProductVersion
        if ($version -match '^(\d+)\.(\d+)') {
            return (Join-Path $FreeCadAppData ("v{0}-{1}\Mod" -f $Matches[1], $Matches[2]))
        }
    }

    return (Join-Path $FreeCadAppData 'Mod')
}

function Test-RpcPort {
    $client = New-Object System.Net.Sockets.TcpClient
    try {
        $handle = $client.BeginConnect($RpcHost, $RpcPort, $null, $null)
        if (-not $handle.AsyncWaitHandle.WaitOne(1500)) { return $false }
        $client.EndConnect($handle)
        return $true
    } catch {
        return $false
    } finally {
        $client.Close()
    }
}

function Get-AddonTargetPath {
    return (Join-Path (Resolve-FreeCadModDir) $AddonFolderName)
}

# --- steps -------------------------------------------------------------------

function Invoke-Preflight {
    Write-Head 'Step 1 of 7 -- checking this machine'

    if ([Environment]::OSVersion.Version.Major -lt 10) {
        Stop-WithMessage `
            'This script needs Windows 10 or later' `
            ("This machine reports Windows version {0}." -f [Environment]::OSVersion.Version) `
            'Use Route 1 (OpenSCAD only) for session 5. It completes the whole session.'
    }

    # Older machines default to TLS 1.0, which GitHub refuses.
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Write-Ok ("Windows {0}, PowerShell {1}." -f [Environment]::OSVersion.Version, $PSVersionTable.PSVersion)
}

function Install-FreeCad {
    Write-Head 'Step 2 of 7 -- FreeCAD'

    $exe = Find-FreeCadExe
    if ($exe) { Write-Ok "FreeCAD is already installed: $exe"; return }
    if ($SkipApps) { Write-Skip 'FreeCAD not found, and -SkipApps was given. Install it yourself.'; return }

    Install-WithWinget 'FreeCAD.FreeCAD' 'FreeCAD'
}

function Install-ClaudeDesktop {
    Write-Head 'Step 3 of 7 -- Claude Desktop'

    $installedPath = if ($env:LOCALAPPDATA) { Join-Path $env:LOCALAPPDATA 'AnthropicClaude' } else { $null }
    $installed = ($installedPath -and (Test-Path $installedPath)) -or [bool](Get-InstalledApp 'Claude*')
    if ($installed) { Write-Ok 'Claude Desktop is already installed.'; return }
    if ($SkipApps) { Write-Skip 'Claude Desktop not found, and -SkipApps was given. Install it yourself.'; return }

    Install-WithWinget 'Anthropic.Claude' 'Claude Desktop'
}

function Install-Uv {
    Write-Head 'Step 4 of 7 -- uv (runs the MCP server)'

    Update-PathFromRegistry
    if (Test-CommandExists 'uvx') { Write-Ok 'uv is already installed.'; return }

    if (Test-CommandExists 'winget') {
        Write-Work 'Installing uv.'
        Invoke-Native {
            winget install --id 'astral-sh.uv' --exact --source winget `
                --accept-package-agreements --accept-source-agreements --disable-interactivity
        }
        Update-PathFromRegistry
    }

    if (-not (Test-CommandExists 'uvx')) {
        # uv's own installer is the documented fallback and needs no winget.
        Write-Work 'Installing uv from astral.sh instead.'
        try {
            Invoke-Expression (Invoke-RestMethod -Uri 'https://astral.sh/uv/install.ps1' -UseBasicParsing)
        } catch {
            Stop-WithMessage `
                'Installing uv failed' `
                $_.Exception.Message `
                'Check that this machine can reach the internet, then run this script again.'
        }
        Update-PathFromRegistry
    }

    if (-not (Test-CommandExists 'uvx')) {
        Stop-WithMessage `
            'uv installed but cannot be found' `
            'uvx is still not on this shell PATH after installing.' `
            'Close this window, open a new PowerShell window, and run this script again.'
    }
    Write-Ok 'uv installed.'
}

function Install-Addon {
    Write-Head 'Step 5 of 7 -- the FreeCAD addon'

    $modDir = Resolve-FreeCadModDir
    $target = Join-Path $modDir $AddonFolderName
    $temp   = Join-Path $env:TEMP ('freecad-mcp-' + [guid]::NewGuid().ToString('N'))
    $zip    = Join-Path $temp 'addon.zip'

    try {
        New-Item -ItemType Directory -Path $temp -Force | Out-Null

        Write-Work "Downloading the addon ($Ref) from GitHub."
        try {
            Invoke-WebRequest -Uri $AddonZipUrl -OutFile $zip -UseBasicParsing
        } catch {
            Stop-WithMessage `
                'Downloading the addon failed' `
                $_.Exception.Message `
                "Check the internet connection and that $AddonZipUrl opens in a browser, then run this script again."
        }

        Expand-Archive -Path $zip -DestinationPath $temp -Force

        $source = Get-ChildItem $temp -Directory -Recurse -Filter $AddonFolderName -ErrorAction SilentlyContinue |
            Sort-Object { $_.Parent.Name -ne 'addon' } |
            Select-Object -First 1
        if (-not $source) {
            Stop-WithMessage `
                'The downloaded addon does not look right' `
                "No $AddonFolderName folder was found inside the download." `
                'The upstream project may have moved things. Tell your instructor, and use Route 1 for now.'
        }

        if (-not (Test-Path $modDir)) {
            New-Item -ItemType Directory -Path $modDir -Force | Out-Null
            Write-Note "Created the FreeCAD addon folder: $modDir"
        }

        # Never overwrite in place: a half-copied addon over a working one is
        # harder to diagnose than either a clean install or an obvious failure.
        if (Test-Path $target) {
            $backup = "$target.backup-$Stamp"
            Move-Item -Path $target -Destination $backup
            Write-Note "Moved the previous addon aside: $backup"
        }

        Copy-Item -Path $source.FullName -Destination $target -Recurse
        Write-Ok "Addon installed: $target"
    } finally {
        if (Test-Path $temp) { Remove-Item $temp -Recurse -Force -ErrorAction SilentlyContinue }
    }
}

function Enable-RpcAutoStart {
    Write-Head 'Step 6 of 7 -- starting the FreeCAD server by itself'

    # The addon keeps this file in FreeCAD's user folder, the parent of Mod.
    $path = Join-Path (Split-Path (Resolve-FreeCadModDir) -Parent) $AddonSettings
    $settings = [pscustomobject]@{}

    if (Test-Path $path) {
        $raw = Get-Content $path -Raw
        Copy-Item $path "$path.backup-$Stamp"
        if ($raw -and $raw.Trim()) {
            try {
                $settings = $raw | ConvertFrom-Json
            } catch {
                # Unlike Claude's settings, nothing is lost by replacing this:
                # the addon already ignores a file it cannot read.
                Write-Note "The addon's settings file could not be read, so it is being replaced. The old one is at $path.backup-$Stamp"
                $settings = [pscustomobject]@{}
            }
        }
    }

    $settings | Add-Member -MemberType NoteProperty -Name 'auto_start_rpc' -Value $true -Force
    Write-JsonFile $path $settings
    Write-Ok 'FreeCAD will start its server by itself whenever it opens.'
}

function Update-ClaudeConfig {
    Write-Head 'Step 7 of 7 -- telling Claude Desktop about FreeCAD'

    $config = [pscustomobject]@{}

    if (Test-Path $ClaudeConfig) {
        $raw = Get-Content $ClaudeConfig -Raw
        if ($raw -and $raw.Trim()) {
            try {
                $config = $raw | ConvertFrom-Json
            } catch {
                Stop-WithMessage `
                    'Claude Desktop settings file could not be read' `
                    "$ClaudeConfig exists but is not valid JSON, so this script will not touch it." `
                    'Open that file, fix or empty it, then run this script again. It has not been changed.'
            }
        }
        Copy-Item $ClaudeConfig "$ClaudeConfig.backup-$Stamp"
        Write-Note "Backed up your settings: $ClaudeConfig.backup-$Stamp"
    } else {
        if (-not (Test-Path $ClaudeConfigDir)) {
            New-Item -ItemType Directory -Path $ClaudeConfigDir -Force | Out-Null
        }
    }

    # Merge, never replace: anything else already registered keeps working.
    if (-not $config.PSObject.Properties['mcpServers'] -or $null -eq $config.mcpServers) {
        $config | Add-Member -MemberType NoteProperty -Name 'mcpServers' -Value ([pscustomobject]@{}) -Force
    }
    $entry = [pscustomobject]@{ command = 'uvx'; args = @('freecad-mcp') }
    $config.mcpServers | Add-Member -MemberType NoteProperty -Name 'freecad' -Value $entry -Force

    Write-JsonFile $ClaudeConfig $config
    Write-Ok "Settings written: $ClaudeConfig"

    Write-Work 'Fetching the MCP server itself. This can take a minute.'
    Invoke-Native { uvx freecad-mcp --help *> $null }
    if ($LASTEXITCODE -ne 0) {
        Write-Bad 'The MCP server did not start when tested.'
        Write-Note 'Everything else is installed. Run this script again with -Verify after restarting Claude Desktop.'
    } else {
        Write-Ok 'The MCP server runs.'
    }
}

function Show-NextSteps {
    $freeCadOpen = [bool](Get-Process -Name 'FreeCAD' -ErrorAction SilentlyContinue)
    $claudeOpen  = [bool](Get-Process -Name 'claude' -ErrorAction SilentlyContinue)

    Write-Head 'Done. What is left is opening the programs'
    if ($freeCadOpen) {
        Write-Host '  - FreeCAD is open, and it has not loaded the new setup yet.'
        Write-Host '    Close it and open it again. Its server then starts by itself.'
    } else {
        Write-Host '  - Open FreeCAD. Its server starts by itself -- there is nothing to click.'
    }
    if ($claudeOpen) {
        Write-Host '  - Claude Desktop is running, and it reads its settings only when it starts.'
        Write-Host '    Quit it from the Claude icon in the tray next to the clock: right-click, Quit.'
        Write-Host '    Closing its window is not enough -- it keeps running in the tray.'
        Write-Host '    Then open it again.'
    } else {
        Write-Host '  - Open Claude Desktop.'
    }
    Write-Host ''
    Write-Host '  Then ask Claude Desktop: "List the open FreeCAD documents."'
    Write-Host '  It should answer with a document name, not an error.'
    Write-Host ''
    Write-Host '  If it does not, run this script again with -Verify and it will tell you which'
    Write-Host '  piece is missing.'
    Write-Host ''
}

function Invoke-Verify {
    Write-Head 'Checking your session 5 setup'
    $problems = 0

    $exe = Find-FreeCadExe
    if ($exe) { Write-Ok "FreeCAD installed: $exe" }
    else { Write-Bad 'FreeCAD is not installed.'; $problems++ }

    $addon = Get-AddonTargetPath
    if (Test-Path $addon) { Write-Ok "Addon installed: $addon" }
    else { Write-Bad "Addon is missing. Expected it at: $addon"; $problems++ }

    $settingsPath = Join-Path (Split-Path (Resolve-FreeCadModDir) -Parent) $AddonSettings
    $autoStart = $false
    if (Test-Path $settingsPath) {
        try { $autoStart = ((Get-Content $settingsPath -Raw | ConvertFrom-Json).auto_start_rpc -eq $true) } catch { $autoStart = $false }
    }
    if ($autoStart) { Write-Ok 'FreeCAD is set to start its server by itself.' }
    else { Write-Bad "FreeCAD is not set to start its server by itself: $settingsPath"; $problems++ }

    Update-PathFromRegistry
    if (Test-CommandExists 'uvx') { Write-Ok 'uv installed.' }
    else { Write-Bad 'uv is not installed.'; $problems++ }

    if (Test-Path $ClaudeConfig) {
        $hasEntry = $false
        try {
            $config = Get-Content $ClaudeConfig -Raw | ConvertFrom-Json
            $hasEntry = $config.mcpServers -and $config.mcpServers.PSObject.Properties['freecad']
        } catch {
            $hasEntry = $false
        }
        if ($hasEntry) { Write-Ok 'Claude Desktop knows about FreeCAD.' }
        else { Write-Bad "Claude Desktop settings have no freecad entry: $ClaudeConfig"; $problems++ }
    } else {
        Write-Bad "Claude Desktop settings file not found: $ClaudeConfig"; $problems++
    }

    # This is the failure everyone hits, so name the cause rather than the symptom.
    if (Test-RpcPort) {
        Write-Ok "FreeCAD's server is running on port $RpcPort."
    } else {
        $running = [bool](Get-Process -Name 'FreeCAD' -ErrorAction SilentlyContinue)
        if ($running) {
            Write-Bad "FreeCAD is open, but its server is not running."
            Write-Note 'Close FreeCAD and open it again. If it was opened before setup ran, it has not loaded the addon yet.'
            Write-Note 'Still nothing? In FreeCAD choose the "MCP Addon" workbench and click "Start RPC Server".'
        } else {
            Write-Bad 'FreeCAD is not open.'
            Write-Note 'Open FreeCAD. Its server starts by itself.'
        }
        $problems++
    }

    Write-Host ''
    if ($problems -eq 0) {
        Write-Host '  Everything is in place. Ask Claude Desktop: "List the open FreeCAD documents."' -ForegroundColor Green
    } else {
        Write-Host "  $problems thing(s) above need fixing. Run this script with no options to install what is missing." -ForegroundColor Yellow
    }
    Write-Host ''
}

# --- main --------------------------------------------------------------------

Write-Host ''
Write-Host '  Applied AI Mastery -- session 5' -ForegroundColor White
Write-Host '  FreeCAD + MCP + Claude Desktop setup for Windows' -ForegroundColor White

if ($Verify) {
    Invoke-Verify
    return
}

Invoke-Preflight
Install-FreeCad
Install-ClaudeDesktop
Install-Uv
Install-Addon
Enable-RpcAutoStart
Update-ClaudeConfig
Show-NextSteps
