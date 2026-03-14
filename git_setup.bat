@echo off
echo ================================================
echo   PythonLearn - Git Setup Script (Windows)
echo ================================================
echo.

:: Check git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH.
    echo Download from https://git-scm.com
    pause
    exit /b 1
)

set /p GITHUB_USERNAME="Enter your GitHub username: "
set /p REPO_NAME="Enter repository name (default: pythonlearn): "
if "%REPO_NAME%"=="" set REPO_NAME=pythonlearn

echo.
echo -----------------------------------------------
echo  IMPORTANT: Before continuing, make sure you
echo  have created the repo on GitHub first:
echo  https://github.com/new
echo  Name it: %REPO_NAME%
echo  Leave it EMPTY (no README, no .gitignore)
echo -----------------------------------------------
echo.
pause

:: Init
echo Initializing git repository...
git init

:: Set default branch to main
git config init.defaultBranch main

echo.
echo Staging all files...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: PythonLearn A-Z Tutorial Platform"

echo.
echo Connecting to GitHub...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Push failed. Common causes:
    echo  1. Repo does not exist on GitHub — create it first
    echo  2. Wrong username or repo name
    echo  3. Not authenticated — run: git config --global credential.helper manager
    pause
    exit /b 1
)

echo.
echo ================================================
echo   SUCCESS! Code pushed to GitHub.
echo   https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo ================================================
pause