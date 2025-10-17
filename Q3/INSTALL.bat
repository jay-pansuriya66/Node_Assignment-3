@echo off
echo ========================================
echo    ERP SYSTEM - INSTALLATION
echo ========================================
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Backend installation failed!
    pause
    exit /b %errorlevel%
)
echo [OK] Backend dependencies installed
cd ..

echo.
echo Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend installation failed!
    pause
    exit /b %errorlevel%
)
echo [OK] Frontend dependencies installed
cd ..

echo.
echo ========================================
echo    INSTALLATION COMPLETE!
echo ========================================
echo.
echo Next Steps:
echo 1. Start MongoDB: net start MongoDB
echo 2. Configure backend/.env file
echo 3. Run START_PROJECT.bat
echo.
echo Press any key to exit...
pause >nul
