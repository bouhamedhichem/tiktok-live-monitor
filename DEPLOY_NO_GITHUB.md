# Deploy to hichem.app - No GitHub Required

## Option 1: Vercel CLI (Easiest - 2 Commands)

Vercel supports direct deployment without Git.

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Deploy Backend (to Vercel):
```bash
cd backend
vercel --prod
```

**Note:** Vercel's free tier has limitations for WebSocket backends. For production WebSocket support, use Railway or Render (Options 2-3).

### Deploy Frontend:
```bash
cd frontend
vercel --prod
```

After deployment:
1. Vercel will give you URLs
2. In Vercel dashboard, add custom domain `hichem.app`
3. Follow DNS instructions Vercel provides

---

## Option 2: Railway CLI (Best for Full-Stack)

Railway supports WebSockets well and doesn't require GitHub.

### Install Railway CLI:
```bash
npm install -g @railway/cli
```

### Login:
```bash
railway login
```

### Deploy Backend:
```bash
cd backend
railway init
railway up
```

### Deploy Frontend:
```bash
cd frontend
railway init
railway up
```

### Add Custom Domain:
1. Go to https://railway.app/dashboard
2. Select your project
3. Settings → Custom Domain
4. Add `hichem.app`
5. Follow DNS instructions

---

## Option 3: Direct Hosting (Traditional)

### A. Deploy to VPS (DigitalOcean, Linode, AWS EC2)

1. **Rent a server** ($5-10/month)
2. **SSH into server**
3. **Install Node.js**:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y nginx
```

4. **Upload your code**:
```bash
# On your local machine
scp -r tiktok-live-monitor root@your-server-ip:/var/www/
```

5. **Install & Run**:
```bash
# On server
cd /var/www/tiktok-live-monitor/backend
npm install
npm install -g pm2
pm2 start src/server.js --name tiktok-backend

cd /var/www/tiktok-live-monitor/frontend
npm install
npm run build
```

6. **Configure Nginx**:
```nginx
# /etc/nginx/sites-available/hichem.app
server {
    server_name hichem.app www.hichem.app;
    
    location / {
        root /var/www/tiktok-live-monitor/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

7. **Enable site**:
```bash
sudo ln -s /etc/nginx/sites-available/hichem.app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Add SSL (Free)**:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d hichem.app -d www.hichem.app
```

9. **Point DNS to your server**:
```
A Record: @ → Your Server IP
A Record: www → Your Server IP
```

---

## Option 4: Heroku (Simple but Requires Credit Card)

### Install Heroku CLI:
```bash
npm install -g heroku
heroku login
```

### Deploy Backend:
```bash
cd backend
heroku create hichem-backend
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a hichem-backend
git push heroku main
```

### Deploy Frontend:
Build locally and deploy static files to Netlify Drop or similar.

```bash
cd frontend
npm run build
# Drag frontend/dist folder to https://app.netlify.com/drop
```

### Custom Domain:
- In Heroku: Settings → Domains → Add hichem.app
- Follow DNS instructions

---

## Option 5: Netlify Drop + Backend on Railway

### Frontend (Easiest):
1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Go to: https://app.netlify.com/drop
3. Drag the `dist` folder
4. Add custom domain in Netlify settings

### Backend:
Use Railway (Option 2 above) or any VPS.

---

## Option 6: Docker + Any Host

### Create Dockerfile for Backend:
```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

### Create Dockerfile for Frontend:
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Deploy to any Docker host:
```bash
docker build -t tiktok-backend ./backend
docker build -t tiktok-frontend ./frontend
docker run -d -p 4000:4000 tiktok-backend
docker run -d -p 80:80 tiktok-frontend
```

---

## Recommended for You:

**If you want simplicity:** Use **Vercel CLI** (Option 1)
**If you need WebSockets:** Use **Railway** (Option 2)
**If you want full control:** Use **VPS** (Option 3)
**If you have hosting already:** Use **Docker** (Option 6)

---

## Quick Comparison:

| Option   | Setup Time | Cost      | WebSocket | Custom Domain |
|----------|------------|-----------|-----------|---------------|
| Vercel   | 5 min      | Free      | Limited   | ✅ Easy       |
| Railway  | 5 min      | $5/mo     | ✅ Full   | ✅ Easy       |
| VPS      | 30 min     | $5-10/mo  | ✅ Full   | ✅ Manual     |
| Heroku   | 10 min     | Free/Paid | ✅ Full   | ✅ Easy       |
| Netlify  | 2 min      | Free      | ❌        | ✅ Easiest    |

---

## DNS Configuration (All Options)

Once you have your hosting URLs, configure DNS at your domain registrar:

```
Type: A or CNAME
Name: @
Value: <your-hosting-ip-or-url>

Type: CNAME
Name: www
Value: <your-hosting-url>
```

Wait 5-60 minutes for propagation.

---

**Which option would you like to try?** Let me know and I can provide more specific instructions!
