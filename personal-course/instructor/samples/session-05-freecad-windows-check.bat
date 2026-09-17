@echo off
rem  Applied AI Mastery -- session 5 setup check for Windows.
rem
rem  Same script as the setup file, run with -Verify: it changes nothing and
rem  reports which of the five pieces is missing. This exists as its own file
rem  because a double-click cannot pass an option, and checking is exactly
rem  where a learner needs the least friction.

setlocal
title Applied AI Mastery - session 5 check

echo.
echo   Applied AI Mastery -- session 5
echo   Checking your FreeCAD setup. This changes nothing.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; $script = Join-Path $env:TEMP 'session-05-freecad-windows.ps1'; Invoke-WebRequest -Uri 'https://applied-ai-mastery.web.app/s5/windows-script' -OutFile $script -UseBasicParsing; & $script -Verify"

echo.
echo   Press any key to close this window.
pause >nul
