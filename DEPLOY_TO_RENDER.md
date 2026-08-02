# Deploy Backend to Render (100% Free Forever)

## Quick Steps to Move Backend from Railway to Render

### Step 1: Push Your Code to GitHub

First, create a GitHub repository:

1. Go to: https://github.com/new
2. Repository name: `tiktok-live-monitor`
3. Click **Create repository**

Then run these commands:

```bash
cd tiktok-live-monitor
git add .
git commit -m "Add Render configuration"
git remote add origin https://github.com/YOUR_USERNAME/tiktok-live-monitor.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy Backend to Render

1. Go to: https://dashboard.render.com/
2. Click **New +** → **Web Service**
3. Click **Connect GitHub** (if not connected)
4. Select your `tiktok-live-monitor` repository
5. Configure the service:

**Settings:**
- **Name:** `tiktok-monitor-backend`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** **Free** ✅

6. Click **Advanced** and add these **Environment Variables:**

```
CORS_ORIGIN = https://frontend-lake-xi-51.vercel.app,https://hichem.app
DEFAULT_KEYWORDS = giveaway,discount,order,interested,price
PHONE_MIN_DIGITS = 8
PHONE_MAX_DIGITS = 15
RECONNECT_MAX_ATTEMPTS = 5
RECONNECT_DELAY_MS = 4000
CONNECT_TIMEOUT_MS = 20000
LOG_LEVEL = info
```

7. Click **Create Web Service**
8. Wait 3-5 minutes for deployment

---

### Step 3: Get Your Render Backend URL

Once deployed, Render will give you a URL like:
```
https://tiktok-monitor-backend.onrender.com
```

Copy this URL!

---

### Step 4: Update Frontend to Use Render Backend

Run these commands:

```bash
cd frontend

# Remove old Vercel environment variable
vercel env rm VITE_API_URL production

# Add new Render backend URL
vercel env add VITE_API_URL production
# When prompted, enter: https://tiktok-monitor-backend.onrender.com

# Redeploy frontend
vercel --prod
```

---

### Step 5: Delete Railway Backend (Optional)

To avoid confusion and stop Railway:

1. Go to: https://railway.app/dashboard
2. Find your `tiktok-live-monitor-backend` project
3. Settings → Delete Service

---

## Final Setup:

**Frontend:** Vercel (https://hichem.app) - **Free Forever** ✅  
**Backend:** Render - **Free Forever** ✅

**Total Cost: $0/month forever!** 🎉

---

## Important Notes:

### Render Free Tier Features:
- ✅ **Completely free forever**
- ✅ **No credit card required**
- ✅ **750 hours/month** (more than enough for your 5-6 hours/day)
- ⚠️ **Sleeps after 15 minutes of inactivity**
- ⚠️ **30-60 second cold start** when waking up

### For Your Use Case:
- You use it 5-6 hours/day continuously = **No cold starts during sessions**
- First connection of the day = **30-60 second wait** (one time)
- Then it works perfectly for your entire session!

---

## Need Help?

If you need me to walk you through these steps, let me know! I can help with each step.
