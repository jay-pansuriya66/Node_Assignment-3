@echo off
echo ========================================
echo    ERP SYSTEM - STARTING SERVERS
echo ========================================
echo.

REM Check if MongoDB is running
echo Checking MongoDB...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MongoDB is running
) else (
    echo [WARNING] MongoDB is not running!
    echo Please start MongoDB first with: net start MongoDB
    echo Or run: mongod
    pause
    exit
)

echo.
echo Starting Backend Server...
start "ERP Backend" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "ERP Frontend" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo    SERVERS STARTING...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin:    http://localhost:5000/admin/login
echo.
echo Press any key to close this window...
pause >nul
