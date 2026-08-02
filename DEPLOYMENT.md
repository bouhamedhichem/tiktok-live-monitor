# Deployment Guide for hichem.app

## Quick Start - Deploy to Render with Custom Domain

Your project is ready to deploy! Follow these steps to get it live on **hichem.app**.

---

## Step 1: Push to GitHub

```bash
# Create a new repository on GitHub (github.com/new)
# Name it: tiktok-live-monitor

# Then run these commands in your project directory:
git remote add origin https://github.com/YOUR_USERNAME/tiktok-live-monitor.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Render (Recommended)

### Option A: One-Click Blueprint Deployment

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Blueprint**
3. Connect your GitHub account if not already connected
4. Select your `tiktok-live-monitor` repository
5. Render will detect `render.yaml` and show two services:
   - `tiktok-monitor-backend` (Web Service)
   - `tiktok-monitor-frontend` (Static Site)
6. Click **Apply**
7. Wait 3-5 minutes for both services to deploy

### Option B: Manual Deployment

**Backend:**
1. New + → Web Service
2. Connect your repo
3. Settings:
   - Name: `tiktok-monitor-backend`
   - Root Directory: `backend`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
4. Add Environment Variables (from backend/.env.example)

**Frontend:**
1. New + → Static Site
2. Connect your repo
3. Settings:
   - Name: `tiktok-monitor-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL from step above

---

## Step 3: Configure Custom Domain (hichem.app)

### On Render:

1. Go to your **frontend** service dashboard
2. Click **Settings** → **Custom Domain**
3. Click **Add Custom Domain**
4. Enter: `hichem.app` and `www.hichem.app`
5. Render will show DNS records you need to add

### On Your Domain Registrar (where you bought hichem.app):

Add these DNS records:

```
Type: A
Name: @
Value: 216.24.57.1 (Render's IP - check Render dashboard for current IP)

Type: CNAME
Name: www
Value: tiktok-monitor-frontend.onrender.com
```

**Note:** DNS propagation can take 1-48 hours (usually under 1 hour)

---

## Alternative Platforms

### Vercel (Easier Custom Domains)

**Backend:**
Vercel doesn't support long-running WebSocket servers well. Deploy backend to Render, Railway, or Heroku.

**Frontend:**
```bash
cd frontend
npm install -g vercel
vercel --prod
```
Then add custom domain in Vercel dashboard.

### Railway

1. Go to [Railway](https://railway.app/)
2. **New Project** → **Deploy from GitHub**
3. Select your repo
4. Railway will auto-detect and deploy both services
5. Add custom domain in project settings

### Netlify

Similar to Vercel - best for frontend only. Backend needs separate hosting.

---

## Environment Variables for Production

### Backend (.env):
```env
PORT=4000
CORS_ORIGIN=https://hichem.app,https://www.hichem.app
DEFAULT_TIKTOK_USERNAME=
DEFAULT_KEYWORDS=giveaway,discount,order,interested,price
PHONE_MIN_DIGITS=8
PHONE_MAX_DIGITS=15
RECONNECT_MAX_ATTEMPTS=5
RECONNECT_DELAY_MS=4000
CONNECT_TIMEOUT_MS=20000
LOG_LEVEL=info
```

### Frontend (.env):
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Important Notes

### Free Tier Limitations (Render):
- **Cold starts**: Services spin down after 15 minutes of inactivity
- **First request**: Takes 30-60 seconds to wake up
- **Ephemeral storage**: Data resets on each restart
- **Solution**: Export data regularly or upgrade to paid plan with persistent disk

### SSL/HTTPS:
- Render provides free SSL certificates automatically
- Your custom domain will have HTTPS enabled automatically

### Monitoring:
- Check logs in Render dashboard for any issues
- Backend logs available under your web service
- Frontend build logs available under static site

---

## Post-Deployment Checklist

✅ Both services deployed and running
✅ Frontend can reach backend API
✅ WebSocket connection works
✅ Custom domain pointing to frontend
✅ HTTPS enabled
✅ CORS configured correctly
✅ Test with a live TikTok stream

---

## Troubleshooting

**Frontend can't connect to backend:**
- Check CORS_ORIGIN in backend includes your frontend URL
- Check VITE_API_URL in frontend points to backend
- Verify both services are running in Render dashboard

**WebSocket connection fails:**
- Check backend logs for errors
- Ensure backend service is not sleeping (send a request to wake it)
- Verify firewall/network settings

**Custom domain not working:**
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records are correct
- Check domain registrar settings

---

## Need Help?

- Render Docs: https://render.com/docs
- Check service logs in Render dashboard
- Test locally first: `npm run dev` in both backend/frontend

---

**Your app will be live at:**
- https://hichem.app
- https://www.hichem.app

Good luck! 🚀
