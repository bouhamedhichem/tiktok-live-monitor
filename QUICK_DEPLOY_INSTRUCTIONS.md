# Quick Deploy Instructions - DO THIS NOW

## You MUST do these 3 manual steps (I cannot automate web logins):

### Step 1: Deploy to Render (2 minutes)
1. Go to https://render.com/login
2. Click "New +" → "Blueprint"
3. Connect your GitHub repo: `tiktok-live-monitor`
4. Render will read `backend/render.yaml` automatically
5. Click "Apply" - deployment starts automatically
6. **COPY YOUR BACKEND URL**: `https://tiktok-monitor-backend.onrender.com`

### Step 2: Update Frontend .env (30 seconds)
Replace the Railway URL in `frontend/.env` with your new Render URL from Step 1.

### Step 3: Push to trigger Vercel redeploy (30 seconds)
```powershell
git add frontend/.env
git commit -m "Update backend URL"
git push
```

## That's it! 
Your site will work for lifetime, zero cost.

Backend is already configured with:
- CORS_ORIGIN: https://frontend-lake-xi-51.vercel.app
- All environment variables set
- Free tier (750 hrs/month)
- No credit card required

Total time: ~3 minutes
