#!/bin/bash
echo "================================================"
echo "  PythonLearn - Git Setup Script (Mac/Linux)"
echo "================================================"
echo ""

read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter repository name (default: pythonlearn): " REPO_NAME
REPO_NAME=${REPO_NAME:-pythonlearn}

echo ""
echo "Initializing git..."
git init
git add .
git commit -m "Initial commit: PythonLearn A-Z Tutorial Platform"

echo ""
echo "Connecting to GitHub..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
git branch -M main
git push -u origin main

echo ""
echo "================================================"
echo "  SUCCESS!"
echo "  https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "================================================"
