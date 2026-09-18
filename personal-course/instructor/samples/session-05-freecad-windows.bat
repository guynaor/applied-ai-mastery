@echo off
rem  Applied AI Mastery -- session 5 setup for Windows.
rem
rem  The double-click door. Windows refuses to run a downloaded .ps1 on a
rem  double-click, so this three-line wrapper fetches the same script the
rem  one-line PowerShell command uses and runs it with the policy bypassed.
rem  There is still only one script to maintain: the .ps1 on the course site.

setlocal
title Applied AI Mastery - session 5 setup

echo.
echo   Applied AI Mastery -- session 5
echo   FreeCAD + MCP + Claude Desktop setup for Windows
echo.
echo   This downloads the setup script from the course site and runs it.
echo   Windows may ask your permission while it installs. Say yes.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $script = Join-Path $env:TEMP 'session-05-freecad-windows.ps1'; Invoke-WebRequest -Uri 'https://applied-ai-mastery.web.app/s5/windows-script' -OutFile $script -UseBasicParsing; & $script %*"

echo.
echo   Press any key to close this window.
pause >nul
