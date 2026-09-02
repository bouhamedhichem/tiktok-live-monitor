# Render Web Service Setup Guide

## Task 2: Create New Render Web Service

This guide provides step-by-step instructions for creating a new Render Web Service to host the TikTok Live Monitor backend.

---

## Prerequisites

- A GitHub/GitLab/Bitbucket account with the TikTok Live Monitor repository
- The repository must be accessible (public or you have access rights)
- No credit card required for Render free tier

---

## Step-by-Step Instructions

### Step 1: Sign Up or Log In to Render

1. Navigate to **[https://render.com](https://render.com)** in your web browser
2. Click **"Get Started"** or **"Sign Up"** button
3. Choose one of the following sign-up options:
   - **GitHub** (recommended for easy repository connection)
   - **GitLab**
   - **Email**
4. Complete the authentication process
5. If using email, verify your email address via the confirmation link
6. Once logged in, you'll see the Render Dashboard

**Note:** No credit card is required for the free tier. If prompted for payment information, you can skip it.

---

### Step 2: Create New Web Service

1. From the Render Dashboard, click the **"New +"** button in the top right corner
2. Select **"Web Service"** from the dropdown menu
3. You'll be taken to the "Create a new Web Service" page

---

### Step 3: Connect Your Git Repository

#### If you signed up with GitHub/GitLab:

1. You may see a list of your repositories automatically
2. If not, click **"Connect account"** to authorize Render to access your repositories
3. Find the **tiktok-live-monitor** repository in the list
4. Click **"Connect"** next to the repository name

#### If you need to connect a repository manually:

1. Click **"Connect account"** or **"Connect repository"**
2. Authorize Render to access your Git provider
3. Once authorized, select the **tiktok-live-monitor** repository

#### If you don't see your repository:

1. Make sure the repository exists and you have access
2. Try clicking **"Configure account"** to adjust repository access permissions
3. Ensure the repository is not private (or that Render has access to private repos)

---

### Step 4: Configure Service Settings

Once your repository is connected, you'll see a configuration form. Fill in the following details:

#### **Basic Settings:**

1. **Name:** 
   - Enter: `tiktok-live-monitor-backend`
   - (If this name is taken, try: `tiktok-live-monitor-backend-[your-initials]` or similar)
   - This will be part of your URL: `https://[name].onrender.com`

2. **Region:**
   - Select the region closest to you or your users
   - Recommended: `Oregon (US West)` or `Frankfurt (EU Central)` or `Singapore (Southeast Asia)`

3. **Branch:**
   - Enter: `main`
   - (Or your current default branch name, check your repo if unsure)

4. **Root Directory:**
   - Enter: `backend`
   - This tells Render to look inside the `backend` folder for the application

#### **Build & Deploy Settings:**

5. **Runtime:**
   - Select: **Node**
   - The detected runtime should automatically show Node.js

6. **Build Command:**
   - Enter: `npm install`
   - This installs all dependencies listed in package.json

7. **Start Command:**
   - Enter: `npm start`
   - This runs the command defined in package.json scripts

#### **Instance Type:**

8. **Plan:**
   - Select: **Free**
   - You should see "Free - $0/month" or similar
   - Includes 750 hours/month (sufficient for continuous operation)

---

### Step 5: Review Configuration Summary

Before creating the service, verify your configuration matches:

```
Name:           tiktok-live-monitor-backend
Environment:    Node
Region:         [Your selected region]
Branch:         main
Root Directory: backend
Build Command:  npm install
Start Command:  npm start
Plan:           Free
```

---

### Step 6: Create the Web Service

1. Scroll down to the bottom of the configuration page
2. Click the **"Create Web Service"** button (blue button)
3. Render will now:
   - Clone your repository
   - Start the build process
   - Deploy your service

---

### Step 7: Monitor Initial Deployment

After clicking "Create Web Service":

1. You'll be redirected to the service dashboard
2. You'll see the **"Events"** or **"Logs"** tab automatically
3. Watch the deployment process:
   - **"Build starting..."** - Cloning repository
   - **"Running build command..."** - Installing dependencies (`npm install`)
   - **"Build successful"** - Dependencies installed
   - **"Starting service..."** - Running `npm start`
   - **"Deploy live"** - Service is running ✅

4. The deployment typically takes **2-5 minutes**

---

### Step 8: Verify Service Status

Once deployment completes:

1. Check the service status indicator at the top of the page:
   - **Green "Live"** indicator = Service is running ✅
   - Yellow "Building" = Still deploying
   - Red "Failed" = Deployment error (check logs)

2. Locate your **Service URL** at the top of the dashboard:
   - Format: `https://tiktok-live-monitor-backend.onrender.com`
   - Copy this URL - you'll need it for later configuration steps

---

### Step 9: Test the Health Check Endpoint

Verify your backend is responding:

#### Option 1: Using a Web Browser
1. Open a new browser tab
2. Navigate to: `https://[your-service-name].onrender.com/api/health`
3. You should see a JSON response:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-01-15T10:30:00.000Z"
   }
   ```

#### Option 2: Using Command Line (PowerShell/Terminal)
```powershell
curl https://[your-service-name].onrender.com/api/health
```

**Expected Result:** Status 200 OK with the JSON response above

---

## What's Next?

✅ **Task 2 Complete!** Your Render Web Service is now created and running.

**Next steps:**
- **Task 3:** Configure environment variables in Render
- **Task 4:** Deploy and verify the backend service
- **Task 5:** Update frontend configuration to point to your new backend URL

---

## Important Notes

### Free Tier Behavior

1. **Sleep After Inactivity:**
   - Free services sleep after **15 minutes** of no incoming traffic
   - First request after sleep takes **30-60 seconds** to wake up (cold start)
   - This is normal and expected for free hosting

2. **Monthly Limits:**
   - **750 hours/month** of service uptime
   - Continuous operation = ~720 hours/month ✅
   - Sufficient for 24/7 usage

3. **Storage:**
   - Free tier uses **ephemeral storage**
   - Files (comments.json, leads.json) persist during uptime
   - Files **reset on service restart** (sleep/wake, manual restart, redeploy)
   - Users should export data regularly

### Service URL

- Your service URL: `https://[service-name].onrender.com`
- This URL uses **HTTPS by default** (SSL certificate provided by Render)
- Copy this URL - you'll need it to configure the frontend

### Auto-Deploy

- By default, Render will **auto-deploy** when you push changes to the `main` branch
- You can disable auto-deploy in the service settings if needed
- Manual deploys can be triggered from the dashboard

---

## Troubleshooting

### Issue: Build Failed

**Symptoms:** Red "Failed" status, build errors in logs

**Solutions:**
1. Check the **Logs** tab for error messages
2. Verify `backend/package.json` exists in your repository
3. Verify Node.js version compatibility (requires Node 18+)
4. Ensure `Root Directory` is set to `backend` (not `/backend` or `./backend`)
5. Try manual redeploy: Click **"Manual Deploy"** → **"Deploy latest commit"**

### Issue: Service URL Returns 404

**Symptoms:** Service is "Live" but health check returns 404

**Solutions:**
1. Verify the URL includes `/api/health` endpoint
2. Check that `Start Command` is exactly `npm start`
3. Check logs for server startup messages
4. Verify the server is listening on the correct PORT (Render provides this automatically)

### Issue: Can't Find Repository

**Symptoms:** Repository not listed in connection screen

**Solutions:**
1. Click **"Configure account"** to adjust permissions
2. Ensure repository is not private (or grant Render access to private repos)
3. Verify you're logged into the correct Git account
4. Try disconnecting and reconnecting your Git provider

### Issue: Name Already Taken

**Symptoms:** Service name is unavailable

**Solutions:**
1. Add your initials: `tiktok-live-monitor-backend-jd`
2. Add a number: `tiktok-live-monitor-backend-01`
3. Add a descriptor: `tiktok-live-monitor-backend-prod`

---

## Additional Resources

- **Render Documentation:** [https://render.com/docs](https://render.com/docs)
- **Render Free Tier Details:** [https://render.com/docs/free](https://render.com/docs/free)
- **Support:** [https://render.com/docs/support](https://render.com/docs/support)

---

## Summary Checklist

Before proceeding to the next task, verify:

- [ ] Render account created (no credit card required)
- [ ] Web Service created successfully
- [ ] Service status shows **"Live"** (green indicator)
- [ ] Service URL copied: `https://[your-service-name].onrender.com`
- [ ] Health check endpoint returns 200 OK: `/api/health`
- [ ] Build logs show no errors
- [ ] Service is running on **Free** plan

**Once all items are checked, proceed to Task 3: Configure Environment Variables.**

---

*This guide was created for the Free Backend Migration specification.*
*Last updated: 2024*
