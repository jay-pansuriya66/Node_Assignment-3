@echo off
echo ========================================
echo    Creating PDF from PNG Screenshots
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    echo Please install Python from https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [OK] Python is installed

REM Check if Pillow is installed
python -c "import PIL" >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Pillow library not found. Installing...
    pip install Pillow
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install Pillow!
        pause
        exit /b 1
    )
    echo [OK] Pillow installed successfully
) else (
    echo [OK] Pillow library is installed
)

echo.
echo Running PDF creation script...
echo.

REM Run the Python script
python create_pdf.py

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    PDF Created Successfully!
    echo ========================================
    echo.
    echo Output: Assignment_3_Screenshots.pdf
) else (
    echo.
    echo ========================================
    echo    Error creating PDF
    echo ========================================
)

echo.
echo Press any key to exit...
pause >nul
