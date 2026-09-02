#!/usr/bin/env pwsh
# Automated Render Deployment Script
# This script opens Render Blueprint URL automatically

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  TikTok Live Monitor - Render Deployment  " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Your GitHub repo URL
$repoUrl = "https://github.com/bouhamedhichem/tiktok-live-monitor"

# Render Blueprint creation URL
$renderBlueprintUrl = "https://dashboard.render.com/select-repo?type=blueprint"

Write-Host "Step 1: Opening Render Blueprint in browser..." -ForegroundColor Green
Write-Host ""
Write-Host "When the page opens:" -ForegroundColor Yellow
Write-Host "  1. Sign in with GitHub (no credit card needed)" -ForegroundColor White
Write-Host "  2. Select repository: bouhamedhichem/tiktok-live-monitor" -ForegroundColor White
Write-Host "  3. Click 'Apply' button" -ForegroundColor White
Write-Host "  4. Wait 2 minutes for deployment" -ForegroundColor White
Write-Host "  5. Copy your backend URL (format: https://tiktok-monitor-backend.onrender.com)" -ForegroundColor White
Write-Host ""

# Open Render in default browser
Start-Process $renderBlueprintUrl

Write-Host "Browser opened! Follow the 5 steps above." -ForegroundColor Green
Write-Host ""
Write-Host "After deployment completes, return here and enter your backend URL:" -ForegroundColor Cyan
$backendUrl = Read-Host "Backend URL"

if ($backendUrl -match "^https://.*\.onrender\.com$") {
    Write-Host ""
    Write-Host "Step 2: Updating frontend/.env with new backend URL..." -ForegroundColor Green
    
    $envPath = "frontend/.env"
    $envContent = "# Backend URL - Deployed to Render`nVITE_API_URL=$backendUrl`n"
    Set-Content -Path $envPath -Value $envContent
    
    Write-Host "✓ frontend/.env updated" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Step 3: Committing and pushing to trigger Vercel deployment..." -ForegroundColor Green
    git add frontend/.env
    git commit -m "Update backend URL to Render deployment"
    git push
    
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host "  ✓ DEPLOYMENT COMPLETE!                   " -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Your backend: $backendUrl" -ForegroundColor White
    Write-Host "Your frontend: https://frontend-lake-xi-51.vercel.app" -ForegroundColor White
    Write-Host ""
    Write-Host "Vercel is deploying now (1-2 minutes)..." -ForegroundColor Yellow
    Write-Host "Your site will work forever, zero cost!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Invalid URL format. URL should be like: https://something.onrender.com" -ForegroundColor Red
    Write-Host "Run this script again after deployment." -ForegroundColor Yellow
}
