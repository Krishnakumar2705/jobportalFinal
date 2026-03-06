# 🚀 Deployment Guide - Job Portal

## Overview
- **Backend**: Render.com (Free)
- **Frontend**: Vercel (Free)
- **Database**: MongoDB Atlas (Already configured)

---

## 📋 Pre-Deployment Checklist

- [x] MongoDB Atlas is set up
- [x] Cloudinary account configured
- [x] .env file has all credentials
- [x] .gitignore includes .env and node_modules
- [ ] GitHub repository created
- [ ] Code pushed to GitHub

---

## 🔧 Step 1: Prepare Backend for Deployment

### 1.1 Update package.json

Add start script for production:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "seed": "node seedJobs.js"
}
```

### 1.2 Update CORS Configuration

In `backend/index.js`, update CORS to accept your frontend URL:
```javascript
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}
```

### 1.3 Add to .env
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## 🌐 Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### 2.2 Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the backend folder (if monorepo, set Root Directory to `backend`)

### 2.3 Configure Service
```
Name: jobportal-backend
Region: Choose closest to you
Branch: main
Root Directory: backend (if needed)
Runtime: Node
Build Command: npm install
Start Command: npm start
```

### 2.4 Add Environment Variables
In Render dashboard, add these environment variables:
```
MONGO_URI=your_mongodb_connection_string
PORT=8000
SECRET_KEY=your_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 2.5 Deploy
- Click "Create Web Service"
- Wait 5-10 minutes for deployment
- Copy your backend URL: `https://jobportal-backend-xxxx.onrender.com`

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Update API Endpoints

Update `frontend/src/utils/constant.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const USER_API_END_POINT = `${API_BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/api/v1/company`;
```

### 3.2 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### 3.3 Deploy Frontend
1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Configure:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

### 3.4 Add Environment Variable
In Vercel project settings → Environment Variables:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### 3.5 Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your site will be live at: `https://your-project.vercel.app`

---

## 🔄 Step 4: Update Backend CORS

After frontend is deployed:
1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable with your Vercel URL
3. Restart the service

---

## ✅ Step 5: Test Deployment

### Test these features:
- [ ] Homepage loads
- [ ] User registration works
- [ ] Login works
- [ ] Jobs are displayed
- [ ] Job search works
- [ ] Job application works
- [ ] Recruiter can post jobs
- [ ] File uploads work (profile photo, resume, company logo)

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
**Solution**: Make sure FRONTEND_URL in backend matches your Vercel URL exactly (no trailing slash)

### Issue 2: API calls failing
**Solution**: Check VITE_API_URL in Vercel environment variables

### Issue 3: Images not loading
**Solution**: Verify Cloudinary credentials in Render environment variables

### Issue 4: Backend sleeping (Render free tier)
**Solution**: First request takes 30-60 seconds to wake up the server (normal for free tier)

### Issue 5: MongoDB connection error
**Solution**: 
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify MONGO_URI is correct in Render

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | Free Tier (512MB) | $0 |
| Cloudinary | Free Tier | $0 |
| Render | Free Tier | $0 |
| Vercel | Free Tier | $0 |
| **Total** | | **$0/month** |

**Note**: Free tier limitations:
- Render: Server sleeps after 15 min inactivity
- Vercel: 100GB bandwidth/month
- MongoDB: 512MB storage

---

## 🔐 Security Checklist

- [ ] .env file is in .gitignore
- [ ] No credentials in code
- [ ] MongoDB allows only necessary IPs (or 0.0.0.0/0 for deployment)
- [ ] CORS configured properly
- [ ] Environment variables set in hosting platforms

---

## 📱 Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render (Backend):
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployment:
- Push to GitHub → Automatically deploys
- No manual deployment needed after initial setup

---

## 📊 Monitoring

### Render Dashboard:
- View logs
- Monitor CPU/Memory usage
- Check deployment status

### Vercel Dashboard:
- View deployment logs
- Monitor bandwidth usage
- Check build status

---

## 🎯 Post-Deployment

1. **Share Your Links**:
   - Frontend: `https://your-project.vercel.app`
   - Backend API: `https://your-backend.onrender.com`

2. **Update README.md** with live links

3. **Test thoroughly** before sharing

4. **Seed Database** (if needed):
   ```bash
   # Run locally pointing to production DB
   npm run seed
   ```

---

## 🆘 Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com

---

## ✨ Success!

Once deployed, your job portal will be:
- ✅ Live and accessible worldwide
- ✅ Free to host
- ✅ Automatically deployed on code changes
- ✅ Professional and shareable

**Ready to impress recruiters!** 🚀
