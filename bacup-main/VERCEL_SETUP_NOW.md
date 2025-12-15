# ⚡ VERCEL SETUP - DO THIS NOW

## 🚨 Critical Issue: Environment Variable Missing

Your error says: **"Environment Variable 'MONGODB_URI' references Secret 'mongodb_uri', which does not exist."**

This means Vercel doesn't have your MongoDB connection string.

---

## ✅ SOLUTION (2 Minutes):

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click on your project (the one you just deployed)

### Step 2: Add Environment Variable
1. Click: **Settings** (top navigation)
2. Click: **Environment Variables** (left sidebar)
3. Click: **Add New** button

### Step 3: Enter the Variable

**Name:**
```
MONGODB_URI
```

**Value:**
```
mongodb+srv://mailnihalpm_db_user:noXLP4g5HEeGlrxl@cluster0.yklsvdn.mongodb.net/influencia?retryWrites=true&w=majority
```

**Environments to apply to:**
- ✅ Production
- ✅ Preview  
- ✅ Development

### Step 4: Save and Redeploy
1. Click: **Save**
2. Go to: **Deployments** tab (top navigation)
3. Find the latest deployment
4. Click the **"..."** menu on the right
5. Click: **Redeploy**
6. Wait 1-2 minutes

---

## ✅ Verify It Works

After redeployment, test these URLs (replace `YOUR-DOMAIN` with your Vercel URL):

### 1. Test Registration API:
```bash
curl -X POST https://YOUR-DOMAIN.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"1234567890"}'
```

Should return: `{"success":true,...}`

### 2. Test Admin Panel:
- Open: `https://YOUR-DOMAIN.vercel.app/admin`
- Password: `admin123`
- You should see the registrations list

### 3. Test E-Pass/Ticket:
- Register on: `https://YOUR-DOMAIN.vercel.app`
- You'll get a QR code
- Go to: `https://YOUR-DOMAIN.vercel.app/staff`
- Scan the QR code

---

## 🔒 MongoDB Atlas Network Access

If you still get connection errors after adding the environment variable:

1. Go to: https://cloud.mongodb.com
2. Click: **Network Access** (left sidebar under Security)
3. Click: **Add IP Address**
4. Select: **Allow Access from Anywhere**
5. It will add: `0.0.0.0/0`
6. Click: **Confirm**
7. Wait 2 minutes
8. Redeploy in Vercel again

---

## 📋 Quick Checklist

- [ ] Opened Vercel dashboard
- [ ] Went to Settings > Environment Variables
- [ ] Added `MONGODB_URI` variable
- [ ] Selected all three environments (Production, Preview, Development)
- [ ] Saved the variable
- [ ] Redeployed the project
- [ ] Waited for deployment to complete
- [ ] Tested registration API
- [ ] Tested admin panel
- [ ] Checked MongoDB Atlas Network Access (0.0.0.0/0)

---

## 🎯 Expected Result

After completing these steps:

✅ Registration form works  
✅ Admin panel shows data  
✅ QR codes can be scanned  
✅ No more "MONGODB_URI" errors  
✅ All API endpoints work  

---

## ❌ Still Having Issues?

### Check Vercel Function Logs:
1. Go to: Vercel Dashboard > Your Project
2. Click: **Functions** tab
3. Click on any function (e.g., `/api/register`)
4. View the logs to see exact error

### Common Errors:

**"Connection timeout"**
- Solution: Check MongoDB Atlas Network Access (add 0.0.0.0/0)

**"Authentication failed"**
- Solution: Verify the MONGODB_URI value is correct (check for typos)

**"Database not found"**
- Solution: Ensure database name in URI is "influencia"

---

## 🎉 Success!

Once you see registrations working, your app is fully deployed and functional on Vercel!

**Share your live URL**: `https://YOUR-PROJECT.vercel.app`
