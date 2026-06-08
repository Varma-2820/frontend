@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Please install it from https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing dependencies...
  call npm install
)
echo Starting Rang Mahal on http://localhost:3000 ...
call npm run dev
