@echo off
echo Starting Darzi Service Development Environment...
echo.

if "%1"=="web" (
    echo Starting Web App Development Server...
    cd apps\web
    npm run dev
) else if "%1"=="mobile" (
    echo Starting Mobile App Development...
    cd apps\mobile
    npm run start
) else if "%1"=="server" (
    echo Starting Backend Server...
    npm run dev:server
) else (
    echo Usage: dev.bat [web^|mobile^|server]
    echo.
    echo   web     - Start web app development server
    echo   mobile  - Start mobile app development
    echo   server  - Start backend server only
    echo.
    echo Default: Starting backend server with web app served...
    npm run dev
)