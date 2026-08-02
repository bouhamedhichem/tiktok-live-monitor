# Automated Deployment Script for hichem.app
# Run this after setting up GitHub repo

Write-Host "🚀 TikTok Live Monitor - Automated Deployment" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: GitHub Repository Setup
Write-Host "📦 Step 1: GitHub Repository" -ForegroundColor Yellow
Write-Host "Please create a GitHub repository first:" -ForegroundColor White
Write-Host "  1. Go to: https://github.com/new" -ForegroundColor Gray
Write-Host "  2. Repository name: tiktok-live-monitor" -ForegroundColor Gray
Write-Host "  3. Keep it Public or Private (your choice)" -ForegroundColor Gray
Write-Host "  4. Do NOT initialize with README" -ForegroundColor Gray
Write-Host ""

$repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/tiktok-live-monitor.git)"

if ($repoUrl -ne "") {
    Write-Host "Adding remote..." -ForegroundColor Green
    git remote add origin $repoUrl 2>$null
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Remote already exists, updating..." -ForegroundColor Yellow
        git remote set-url origin $repoUrl
    }
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Green
    git branch -M main
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to push. Check your credentials." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Repository URL required. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "📦 Step 2: Deploy to Render" -ForegroundColor Yellow
Write-Host ""
Write-Host "Now deploy to Render:" -ForegroundColor White
Write-Host "  1. Go to: https://dashboard.render.com/" -ForegroundColor Gray
Write-Host "  2. Click 'New +' → 'Blueprint'" -ForegroundColor Gray
Write-Host "  3. Connect your GitHub account if needed" -ForegroundColor Gray
Write-Host "  4. Select the 'tiktok-live-monitor' repository" -ForegroundColor Gray
Write-Host "  5. Click 'Apply'" -ForegroundColor Gray
Write-Host "  6. Wait 3-5 minutes for deployment" -ForegroundColor Gray
Write-Host ""

$deployed = Read-Host "Have you completed the Render deployment? (yes/no)"

if ($deployed -eq "yes" -or $deployed -eq "y") {
    Write-Host ""
    Write-Host "=============================================" -ForegroundColor Cyan
    Write-Host "🌐 Step 3: Custom Domain Setup" -ForegroundColor Yellow
    Write-Host ""
    
    $frontendUrl = Read-Host "Enter your Render frontend URL (e.g., tiktok-monitor-frontend.onrender.com)"
    
    Write-Host ""
    Write-Host "Configure your custom domain (hichem.app):" -ForegroundColor White
    Write-Host ""
    Write-Host "In Render Dashboard:" -ForegroundColor Cyan
    Write-Host "  1. Go to your frontend service" -ForegroundColor Gray
    Write-Host "  2. Settings → Custom Domain" -ForegroundColor Gray
    Write-Host "  3. Add: hichem.app" -ForegroundColor Gray
    Write-Host "  4. Add: www.hichem.app" -ForegroundColor Gray
    Write-Host "  5. Copy the DNS records shown" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "In Your Domain Registrar (where you bought hichem.app):" -ForegroundColor Cyan
    Write-Host "  Add these DNS records:" -ForegroundColor Gray
    Write-Host "  " -ForegroundColor Gray
    Write-Host "  Type: A" -ForegroundColor White
    Write-Host "  Name: @" -ForegroundColor White
    Write-Host "  Value: 216.24.57.1" -ForegroundColor White
    Write-Host "  " -ForegroundColor Gray
    Write-Host "  Type: CNAME" -ForegroundColor White
    Write-Host "  Name: www" -ForegroundColor White
    Write-Host "  Value: $frontendUrl" -ForegroundColor White
    Write-Host ""
    Write-Host "⏳ DNS propagation can take 5-60 minutes" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "✅ Deployment Process Initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "Your app will be live at:" -ForegroundColor White
Write-Host "  • https://hichem.app" -ForegroundColor Cyan
Write-Host "  • https://www.hichem.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Check DEPLOYMENT.md for troubleshooting" -ForegroundColor Gray
Write-Host "=============================================" -ForegroundColor Cyan
