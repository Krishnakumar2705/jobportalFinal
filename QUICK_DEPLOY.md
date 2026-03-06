# ⚡ Quick Deploy Guide (5 Minutes)

## 🎯 What You Need
- GitHub account
- Render account (sign up with GitHub)
- Vercel account (sign up with GitHub)

---

## 📦 Step 1: Push to GitHub (2 minutes)

```bash
# Navigate to your project
cd jobportal-yt-main

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Job Portal ready for deployment"

# Create repository on GitHub (go to github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/job-portal.git
git branch -M main
git push -u origin main
```

---

## 🚀 Step 2: Deploy Backend to Render (2 minutes)

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `jobportal-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Click **"Advanced"** and add Environment Variables:
   ```
   MONGO_URI = (copy from your backend/.env)
   PORT = 8000
   SECRET_KEY = (copy from your backend/.env)
   CLOUD_NAME = (copy from your backend/.env)
   API_KEY = (copy from your backend/.env)
   API_SECRET = (copy from your backend/.env)
   FRONTEND_URL = https://your-app.vercel.app (add this after frontend deploy)
   ```

6. Click **"Create Web Service"**
7. Wait 5-10 minutes
8. **Copy your backend URL**: `https://jobportal-backend-xxxx.onrender.com`

---

## 🎨 Step 3: Deploy Frontend to Vercel (1 minute)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://jobportal-backend-xxxx.onrender.com` (your Render URL)

5. Click **"Deploy"**
6. Wait 2-3 minutes
7. **Your site is live!** 🎉

---

## 🔄 Step 4: Update Backend CORS

1. Go back to Render dashboard
2. Go to your backend service → Environment
3. Add/Update:
   ```
   FRONTEND_URL = https://your-app.vercel.app
   ```
4. Click **"Save Changes"**
5. Service will auto-restart

---

## ✅ Step 5: Test Your Deployment

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Register new user
- ✅ Login
- ✅ Browse jobs
- ✅ Apply for job

---

## 🎯 Your Live URLs

**Frontend**: `https://your-project.vercel.app`
**Backend API**: `https://jobportal-backend-xxxx.onrender.com`

---

## 📝 Important Notes

### Render Free Tier:
- Server sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This is normal and expected behavior

### MongoDB Atlas:
- Make sure Network Access allows: `0.0.0.0/0` (all IPs)
- Or add Render's IP addresses

### Cloudinary:
- Free tier: 25 credits/month
- Enough for testing and small projects

---

## 🐛 Troubleshooting

### "CORS Error"
- Check FRONTEND_URL in Render matches your Vercel URL exactly
- No trailing slash in URLs

### "Cannot connect to database"
- Verify MONGO_URI in Render environment variables
- Check MongoDB Atlas network access settings

### "API calls failing"
- Verify VITE_API_URL in Vercel environment variables
- Check backend is running (visit backend URL in browser)

### "Images not uploading"
- Verify Cloudinary credentials in Render
- Check browser console for errors

---

## 🎉 Success!

Your job portal is now:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Free to host
- ✅ Auto-deploys on git push

**Share your link and impress recruiters!** 🚀

---

## 📱 Share Your Project

Add these to your resume/portfolio:
- **Live Demo**: https://your-project.vercel.app
- **GitHub**: https://github.com/YOUR_USERNAME/job-portal
- **Tech Stack**: MERN (MongoDB, Express, React, Node.js)

---

## 🔄 Making Updates

After deployment, any changes you push to GitHub will automatically deploy:

```bash
# Make your changes
git add .
git commit -m "Update feature"
git push

# Vercel and Render will auto-deploy!
```

---

## 💡 Pro Tips

1. **Test locally first** before pushing to GitHub
2. **Check logs** in Render/Vercel dashboard if something breaks
3. **Monitor usage** to stay within free tier limits
4. **Keep credentials secure** - never commit .env files

---

**Need detailed help?** Check `DEPLOYMENT_GUIDE.md` for comprehensive instructions.
