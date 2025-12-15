# 🚀 Vercel Deployment Guide - Complete Setup

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas cluster (you already have this)

---

## Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 2: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub repository
4. Click **"Import"**

---

## Step 3: Configure Environment Variables in Vercel

**CRITICAL**: Before deploying, you MUST add the environment variable.

### In the Vercel Import/Deploy Screen:

1. Expand **"Environment Variables"** section
2. Add the following:

   **Variable Name**: `MONGODB_URI`
   
   **Value**: 
   ```
   mongodb+srv://mailnihalpm_db_user:noXLP4g5HEeGlrxl@cluster0.yklsvdn.mongodb.net/influencia?retryWrites=true&w=majority
   ```
   
   **Environment**: Select all three:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

3. Click **"Add"**

---

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment to complete
3. You'll see a success screen with your live URL

---

## Step 5: Verify Deployment

### Test Your Endpoints:

1. **Registration API**:
   ```bash
   curl -X POST https://YOUR-DOMAIN.vercel.app/api/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "phone": "1234567890"
     }'
   ```

2. **Admin Panel**:
   - Go to: `https://YOUR-DOMAIN.vercel.app/admin`
   - Use password: `admin123`

3. **Ticket Check**:
   - Go to: `https://YOUR-DOMAIN.vercel.app/staff`
   - Scan QR codes

---

## Step 6: MongoDB Atlas Network Access

**If you get connection errors**, ensure your MongoDB Atlas allows Vercel's IPs:

1. Go to https://cloud.mongodb.com
2. Navigate to: **Network Access** → **IP Access List**
3. Click: **Add IP Address**
4. Select: **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Click: **Confirm**
6. Wait 2 minutes, then redeploy in Vercel

---

## Updating Environment Variables Later

If you need to change the MongoDB URI or add new variables:

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Edit or add variables
4. **Important**: After changing variables, go to **"Deployments"** → Click the **"..."** menu on latest deployment → **"Redeploy"**

---

## Troubleshooting

### Error: "MONGODB_URI is not defined"
- **Solution**: Add the environment variable in Vercel dashboard (see Step 3)
- Then redeploy the project

### Error: "Could not connect to MongoDB"
- **Solution**: Whitelist Vercel IPs in MongoDB Atlas (see Step 6)
- Check that your MongoDB URI is correct
- Ensure the database user has read/write permissions

### Error: "Function execution timeout"
- **Solution**: Check MongoDB Atlas cluster is not paused
- Verify network access settings
- Check Vercel function logs for details

### Registration/Admin Panel Not Working
- **Solution**: Check browser console for errors
- Verify API endpoints are working (use curl commands above)
- Check Vercel function logs: Dashboard → Project → Functions → View logs

---

## Vercel CLI (Optional but Recommended)

Install Vercel CLI for easier deployments:

```bash
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs YOUR-DOMAIN.vercel.app
```

---

## Security Recommendations

### 1. Change Admin Password
Replace the hardcoded `admin123` password:
- Update in `api/registrations.ts`
- Update in `api/attendees/[attendeeId].ts`
- Add as environment variable instead

### 2. Rotate MongoDB Credentials
If this is a production app:
1. Create a new database user in MongoDB Atlas
2. Update `MONGODB_URI` in Vercel
3. Delete the old user

### 3. Enable HTTPS Only
Vercel automatically provides HTTPS, but ensure:
- No mixed content warnings
- All API calls use HTTPS

---

## Custom Domain (Optional)

To use your own domain (e.g., influencia.com):

1. Go to Vercel dashboard → Your project → **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter your domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 24 hours)

---

## Success Checklist

- ✅ Code pushed to GitHub
- ✅ Project imported to Vercel
- ✅ `MONGODB_URI` environment variable added
- ✅ MongoDB Atlas IP whitelist configured (0.0.0.0/0)
- ✅ Deployment successful
- ✅ Registration form works
- ✅ Admin panel accessible
- ✅ QR code scanning works

---

## Your Deployment Details

**MongoDB Connection**:
- Cluster: `cluster0.yklsvdn.mongodb.net`
- Database: `influencia`
- User: `mailnihalpm_db_user`

**Vercel Configuration**:
- Framework: Vite (React)
- Node Runtime: 20.x
- API Routes: Serverless functions in `/api` directory

**After deployment, your app will be live at**: `https://YOUR-PROJECT-NAME.vercel.app`

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://www.mongodb.com/docs/atlas/
- **Vercel Support**: https://vercel.com/support
- **Check Logs**: Vercel Dashboard → Your Project → Functions → View logs
