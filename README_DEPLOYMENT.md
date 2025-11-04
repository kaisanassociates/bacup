# 🚀 Complete Vercel Deployment Guide

## ⚡ Quick Deploy (5 Minutes)

Your app is ready to deploy to Vercel. Here's what you need to do:

### 1️⃣ Push to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2️⃣ Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. **BEFORE clicking Deploy**, add this environment variable:

   **Name:** `MONGODB_URI`
   
   **Value:**
   ```
   mongodb+srv://mailnihalpm_db_user:noXLP4g5HEeGlrxl@cluster0.yklsvdn.mongodb.net/influencia?retryWrites=true&w=majority
   ```
   
   **Environments:** ✅ Production ✅ Preview ✅ Development

4. Click **Deploy**

### 3️⃣ Configure MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Click **Network Access** → **IP Access List**
3. Click **Add IP Address**
4. Select **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Click **Confirm**
6. Wait 2 minutes

### 4️⃣ Test Your Deployment

Visit these URLs (replace `YOUR-APP` with your Vercel URL):

- **Homepage:** `https://YOUR-APP.vercel.app`
- **Admin Panel:** `https://YOUR-APP.vercel.app/admin` (password: `admin123`)
- **Staff Scanner:** `https://YOUR-APP.vercel.app/staff`

---

## ✅ What's Already Configured

Your project is fully configured for Vercel:

- ✅ **Serverless API Routes** in `/api` directory
- ✅ **MongoDB Connection** with connection pooling
- ✅ **Vercel Config** (`vercel.json`) properly set up
- ✅ **Environment Variables** template in `.env.example`
- ✅ **Vite Build** optimized for production

---

## 🔧 Technical Details

### API Endpoints (Serverless Functions)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/register` | POST | Create new registration |
| `/api/registrations` | GET | List all registrations (admin) |
| `/api/attendees/[id]` | PUT | Update attendee |
| `/api/ticket/[id]` | GET | Get ticket details |

### Runtime Configuration

- **Node.js Version:** 20.x
- **Framework:** Vite + React + TypeScript
- **Database:** MongoDB Atlas
- **Connection Pooling:** Enabled (max 10 connections)
- **Serverless Timeout:** 10 seconds

### Environment Variables Required

| Variable | Required | Purpose |
|----------|----------|---------|
| `MONGODB_URI` | ✅ Yes | MongoDB Atlas connection string |
| `NODE_ENV` | Auto-set | Environment (production/development) |

---

## 🐛 Troubleshooting

### Error: "MONGODB_URI is not defined"

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `MONGODB_URI` with your MongoDB connection string
3. Redeploy the project

### Error: "Could not connect to MongoDB"

**Solution:**
1. Check MongoDB Atlas Network Access
2. Ensure `0.0.0.0/0` is in IP Access List
3. Verify connection string is correct
4. Check MongoDB cluster is not paused

### API Returns 500 Error

**Solution:**
1. Check Vercel function logs: Dashboard → Functions → Select function
2. Look for connection errors
3. Verify `MONGODB_URI` environment variable is set
4. Check MongoDB user has read/write permissions

### Registration Form Not Working

**Solution:**
1. Open browser console (F12)
2. Check for network errors
3. Verify API endpoint URLs are correct
4. Test API directly: `/api/register`

---

## 📊 Monitoring Your App

### View Logs

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# View logs
vercel logs YOUR-DOMAIN.vercel.app
```

### Check Function Performance

1. Vercel Dashboard → Your Project
2. Click **Functions** tab
3. View execution time, errors, and invocations

---

## 🔐 Security Recommendations

### 1. Change Admin Password

Currently hardcoded as `admin123`. To change:

1. Update in `api/registrations.ts` (line 64)
2. Update in `api/attendees/[attendeeId].ts` (line 80)
3. Consider using environment variable instead

### 2. Rotate MongoDB Credentials

For production:

1. Create new database user in MongoDB Atlas
2. Generate strong password
3. Update `MONGODB_URI` in Vercel
4. Delete old user

### 3. Enable Rate Limiting

Consider adding rate limiting to prevent abuse:
- Use Vercel's built-in DDoS protection
- Implement API rate limiting in your endpoints

---

## 🎯 Production Checklist

Before going live:

- [ ] Pushed code to GitHub
- [ ] Deployed to Vercel
- [ ] Added `MONGODB_URI` environment variable
- [ ] Configured MongoDB Atlas network access (0.0.0.0/0)
- [ ] Tested registration form
- [ ] Tested admin panel
- [ ] Tested QR code scanning
- [ ] Changed admin password
- [ ] Verified all API endpoints work
- [ ] Checked function logs for errors
- [ ] Set up custom domain (optional)

---

## 🌐 Custom Domain Setup

To use your own domain:

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `influencia.com`)
3. Update DNS records (Vercel provides instructions)
4. Wait for DNS propagation (up to 24 hours)

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **Vite Docs:** https://vitejs.dev/
- **React Router:** https://reactrouter.com/

---

## 🎉 Success!

Once deployed, your app will be live at:
**`https://YOUR-PROJECT.vercel.app`**

Share the link and start collecting registrations! 🎊
