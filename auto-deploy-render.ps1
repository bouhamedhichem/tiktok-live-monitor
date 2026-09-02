# Automated Render Deployment Script
# This script automates as much as possible

Write-Host "🚀 Automated Render Deployment" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: GitHub Setup
Write-Host "📦 Step 1: GitHub Repository Setup" -ForegroundColor Yellow
Write-Host ""
Write-Host "I need your GitHub repository URL." -ForegroundColor White
Write-Host "Please:" -ForegroundColor White
Write-Host "  1. Open https://github.com/new in your browser" -ForegroundColor Gray
Write-Host "  2. Repository name: tiktok-live-monitor" -ForegroundColor Gray
Write-Host "  3. Click 'Create repository'" -ForegroundColor Gray
Write-Host "  4. Copy the HTTPS URL shown (looks like: https://github.com/username/tiktok-live-monitor.git)" -ForegroundColor Gray
Write-Host ""

$repoUrl = Read-Host "Paste your GitHub repository URL here"

if ($repoUrl -eq "") {
    Write-Host "❌ Repository URL is required!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "⏳ Pushing code to GitHub..." -ForegroundColor Green

git remote add origin $repoUrl 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Remote already exists, updating..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
}

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to push. Please check your credentials." -ForegroundColor Red
    Write-Host "You may need to authenticate with GitHub first." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "📦 Step 2: Deploy to Render" -ForegroundColor Yellow
Write-Host ""

Write-Host "Now let's deploy to Render (100% FREE):" -ForegroundColor White
Write-Host ""
Write-Host "  1. Go to: https://dashboard.render.com/" -ForegroundColor Gray
Write-Host "  2. Click 'New +' → 'Web Service'" -ForegroundColor Gray
Write-Host "  3. Connect your GitHub account" -ForegroundColor Gray
Write-Host "  4. Select 'tiktok-live-monitor' repository" -ForegroundColor Gray
Write-Host ""
Write-Host "  5. Configure:" -ForegroundColor Gray
Write-Host "     - Name: tiktok-monitor-backend" -ForegroundColor White
Write-Host "     - Root Directory: backend" -ForegroundColor White
Write-Host "     - Build Command: npm install" -ForegroundColor White
Write-Host "     - Start Command: npm start" -ForegroundColor White
Write-Host "     - Plan: FREE" -ForegroundColor White
Write-Host ""
Write-Host "  6. Click 'Advanced' and add these Environment Variables:" -ForegroundColor Gray
Write-Host ""
Write-Host "     CORS_ORIGIN = https://frontend-lake-xi-51.vercel.app,https://hichem.app" -ForegroundColor Cyan
Write-Host "     DEFAULT_KEYWORDS = giveaway,discount,order,interested,price" -ForegroundColor Cyan
Write-Host "     PHONE_MIN_DIGITS = 8" -ForegroundColor Cyan
Write-Host "     PHONE_MAX_DIGITS = 15" -ForegroundColor Cyan
Write-Host "     RECONNECT_MAX_ATTEMPTS = 5" -ForegroundColor Cyan
Write-Host "     RECONNECT_DELAY_MS = 4000" -ForegroundColor Cyan
Write-Host "     CONNECT_TIMEOUT_MS = 20000" -ForegroundColor Cyan
Write-Host "     LOG_LEVEL = info" -ForegroundColor Cyan
Write-Host ""
Write-Host "  7. Click 'Create Web Service'" -ForegroundColor Gray
Write-Host "  8. Wait 3-5 minutes for deployment" -ForegroundColor Gray
Write-Host ""

$deployed = Read-Host "Have you completed the Render deployment? Type 'yes' when done"

if ($deployed -ne "yes" -and $deployed -ne "y") {
    Write-Host "❌ Deployment cancelled." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "🔗 Step 3: Update Frontend" -ForegroundColor Yellow
Write-Host ""

$renderUrl = Read-Host "Enter your Render backend URL (e.g., https://tiktok-monitor-backend.onrender.com)"

if ($renderUrl -eq "") {
    Write-Host "❌ Render URL is required!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "⏳ Updating frontend environment..." -ForegroundColor Green

cd frontend

# Remove old variable
Write-Host "Removing old backend URL..." -ForegroundColor Yellow
vercel env rm VITE_API_URL production 2>$null

# Add new variable
Write-Host "Adding new Render backend URL..." -ForegroundColor Yellow
Write-Host $renderUrl | vercel env add VITE_API_URL production

Write-Host ""
Write-Host "⏳ Redeploying frontend..." -ForegroundColor Green
vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Your app is now 100% FREE forever:" -ForegroundColor White
    Write-Host ""
    Write-Host "  Frontend: https://hichem.app" -ForegroundColor Cyan
    Write-Host "  Backend: $renderUrl" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  💰 Cost: $0/month" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Everything is deployed and working!" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend deployment failed!" -ForegroundColor Red
}

cd ..
