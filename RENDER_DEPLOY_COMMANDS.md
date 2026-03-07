# 🚀 Render Deployment - Complete Guide

## Deploy Backend and Frontend Together on Render

---

## 📦 **BACKEND SERVICE**

### Go to: https://dashboard.render.com → New + → Web Service

### **Settings:**

```
Name: jobportal-backend
Region: Oregon (or closest to you)
Branch: main
Root Directory: backend
Runtime: Node
Instance Type: Free
```

### **Build & Deploy:**

```bash
Build Command: npm install
Start Command: npm start
```

### **Environment Variables:**

Click "Advanced" → Add Environment Variables:

```
MONGO_URI
mongodb+srv://krishnak55408_db_user:ci6tWve2V6x2nDiG@cluster0.ethykut.mongodb.net/

PORT
8000

SECRET_KEY
jobportal123

CLOUD_NAME
dwqtleat2

API_KEY
783645894966468

API_SECRET
xIPI9v-hyYWAKrWvgxHIJUW80Ic

NODE_ENV
production

FRONTEND_URL
https://jobportal-5-soog.onrender.com
```

### **Click "Create Web Service"**

⏳ Wait 5-10 minutes for deployment

📋 **Copy your backend URL**: `https://jobportal-backend-xxxx.onrender.com`

---

## 🎨 **FRONTEND SERVICE (OPTION 1: Render Static Site)**

### Go to: https://dashboard.render.com → New + → Static Site

### **Settings:**

```
Name: jobportal-frontend
Branch: main
Root Directory: frontend
```

### **Build Settings:**

```bash
Build Command: npm install && npm run build
Publish Directory: dist
```

### **Environment Variables:**

```
VITE_API_URL
https://jobportal-backend-xxxx.onrender.com
```
(Replace with YOUR actual backend URL from above)

### **Click "Create Static Site"**

---

## 🎨 **FRONTEND SERVICE (OPTION 2: Vercel - Recommended)**

### Go to: https://vercel.com/new

### **Import Project:**

```
Repository: Krishnakumar2705/jobportal
Framework Preset: Vite
Root Directory: frontend
```

### **Build Settings:**

```bash
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### **Environment Variables:**

```
Name: VITE_API_URL
Value: https://jobportal-backend-xxxx.onrender.com
```
(Replace with YOUR actual backend URL)

### **Click "Deploy"**

---

## ✅ **FINAL STEP: Update Backend FRONTEND_URL**

After frontend deploys:

1. Go to Render → Backend Service
2. Environment → Edit `FRONTEND_URL`
3. Change to your actual frontend URL:
   - If Render: `https://jobportal-frontend.onrender.com`
   - If Vercel: `https://your-project.vercel.app`
4. Save Changes (auto-redeploys)

---

## 🧪 **Testing Your Deployment**

### Test Backend:
```bash
curl https://jobportal-backend-xxxx.onrender.com
```
Should return: `{"success":true,"message":"Job Portal API is running"}`

### Test Frontend:
Visit your frontend URL in browser
- Should load the homepage
- Try signup/login
- Check if jobs load

---

## 🐛 **Troubleshooting**

### Backend Issues:

**"Service Unavailable"**
- Check Render logs
- Verify all environment variables are set
- Check MongoDB Atlas allows 0.0.0.0/0

**"MongoDB Connection Error"**
- Go to MongoDB Atlas → Network Access
- Add IP: 0.0.0.0/0 (Allow from anywhere)
- Wait 2-3 minutes

### Frontend Issues:

**"Jobs not loading"**
- Check browser console (F12)
- Verify VITE_API_URL is correct
- Make sure backend URL doesn't have trailing slash

**"Login not working"**
- Check CORS settings in backend
- Verify FRONTEND_URL matches your frontend URL exactly

---

## 📊 **Deployment Checklist**

### Backend:
- [ ] Service created on Render
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] All 8 environment variables added
- [ ] MongoDB Atlas allows 0.0.0.0/0
- [ ] Service is live (green status)
- [ ] Health check returns success

### Frontend:
- [ ] Service created (Render or Vercel)
- [ ] Root directory set to `frontend`
- [ ] Build command correct
- [ ] VITE_API_URL points to backend
- [ ] Site is live
- [ ] Can access homepage

### Final:
- [ ] Backend FRONTEND_URL updated
- [ ] Can signup/login
- [ ] Jobs are loading
- [ ] Filters work
- [ ] Can apply to jobs

---

## 🎯 **Your URLs**

After deployment, you'll have:

**Backend API**: `https://jobportal-backend-xxxx.onrender.com`
**Frontend**: `https://your-project.vercel.app` or `https://jobportal-frontend.onrender.com`

---

## 💡 **Pro Tips**

1. **Deploy backend FIRST**, get the URL, then deploy frontend
2. **Free tier sleeps** after 15 min inactivity (first request takes 30-60 sec)
3. **Check logs** if something doesn't work
4. **MongoDB Atlas** must allow all IPs (0.0.0.0/0)
5. **No trailing slashes** in URLs

---

## 🆘 **Still Having Issues?**

1. Check Render logs (Logs tab in dashboard)
2. Check browser console (F12 → Console tab)
3. Verify all environment variables
4. Make sure MongoDB allows connections
5. Test backend health endpoint first

---

**That's it! Your job portal should be live!** 🚀
