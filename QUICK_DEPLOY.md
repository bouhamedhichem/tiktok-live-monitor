# 🚀 Quick Deploy to hichem.app (3 Steps)

## Automated Script Available!

Run this command in PowerShell:
```powershell
cd tiktok-live-monitor
.\deploy.ps1
```

The script will guide you through each step interactively.

---

## Manual Steps (If Script Doesn't Work)

### Step 1: GitHub (2 minutes)

1. Go to: https://github.com/new
2. Repository name: `tiktok-live-monitor`
3. Click **Create repository**
4. Run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/tiktok-live-monitor.git
git branch -M main
git push -u origin main
```

---

### Step 2: Render Deploy (1 click, 5 minute wait)

1. Go to: https://dashboard.render.com/
2. Click **New +** → **Blueprint**
3. Select your `tiktok-live-monitor` repo
4. Click **Apply**
5. ☕ Wait 3-5 minutes

**Done!** Your app is now live on Render URLs.

---

### Step 3: Custom Domain - hichem.app (2 minutes)

#### In Render:
1. Open your **frontend** service
2. **Settings** → **Custom Domain**
3. Add domain: `hichem.app`
4. Add domain: `www.hichem.app`
5. **Copy the DNS records** Render shows you

#### In Your Domain Registrar:
Go to your domain provider (GoDaddy, Namecheap, Cloudflare, etc.)

Add these records:

| Type  | Name | Value                              | TTL  |
|-------|------|------------------------------------|------|
| A     | @    | 216.24.57.1                        | Auto |
| CNAME | www  | your-app.onrender.com              | Auto |

**Note:** Replace `your-app.onrender.com` with the URL from Render.

⏳ **Wait 5-60 minutes** for DNS propagation.

---

## That's It!

Your app will be live at:
- ✅ https://hichem.app
- ✅ https://www.hichem.app

---

## Troubleshooting

**"Git push requires authentication":**
- Set up GitHub credentials: https://docs.github.com/en/authentication
- Or use GitHub Desktop: https://desktop.github.com/

**"Render deployment failed":**
- Check Render logs in the dashboard
- Verify both services are running
- Check environment variables

**"Custom domain not working":**
- Wait longer (DNS can take up to 48 hours, usually under 1 hour)
- Verify DNS records in your registrar
- Check Render custom domain status

**"Frontend can't connect to backend":**
- In Render, check `CORS_ORIGIN` includes your custom domain
- Redeploy backend after adding custom domain

---

## Need Help?

Check the detailed `DEPLOYMENT.md` file for complete documentation.
