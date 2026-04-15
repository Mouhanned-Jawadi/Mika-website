# 📧 Gmail SMTP + Netlify Deployment Guide

## Your Email Setup

✅ **Frontend:** React contact form (all files ready)
✅ **Backend:** Netlify Function with Gmail SMTP
✅ **Email Account:** mouhanned.jawadi23@gmail.com
✅ **Admin Email:** queenbags.mika@gmail.com

---

## 📋 Step-by-Step Deployment

### Step 1: Update Dependencies Locally
```bash
cd "C:\Users\MSI\Desktop\Internal tools\Mika"
npm install
```

This installs `nodemailer` which the Netlify function needs.

---

### Step 2: Test Locally (Optional)
```bash
npm run dev
```
- Open http://localhost:5173/#admin
- Login with mika@admin.com / mika123
- Add test products
- Try contact form (emails log to console in dev mode)

---

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Add SMTP email configuration with Netlify functions"
git push
```

---

### Step 4: Configure Netlify Environment Variables

**IMPORTANT:** Do this before deploying!

1. Go to [app.netlify.com](https://app.netlify.com)
2. Select your QueensBags site
3. Go to **Settings → Environment → Add Variables**
4. Add these two variables:

| Variable Name | Value |
|---|---|
| `GMAIL_USER` | `mouhanned.jawadi23@gmail.com` |
| `GMAIL_PASS` | `szyi fhcx jprn eket` |

**Then click Save** (or Re-deploy if already deployed)

---

### Step 5: Deploy

Either:
- **Option A:** Push to GitHub (auto-deploy)
- **Option B:** In Netlify → Deployments → Trigger Deploy

---

### Step 6: Test the Deployment

1. Go to your deployed site: https://your-site.netlify.app
2. Fill and submit the contact form
3. Check both emails:
   - **Your email** (confirmation)
   - **queenbags.mika@gmail.com** (admin notification)
4. Both should arrive within 1-2 minutes

---

## 🔧 How the Email System Works

```
Browser
  │
  └─→ Submit Contact Form
        │
        └─→ POST /.netlify/functions/send-email
              │
              ├─→ Create transporter (Gmail SMTP)
              │
              ├─→ Send Email #1: Admin Notification
              │   To: queenbags.mika@gmail.com
              │   From: mouhanned.jawadi23@gmail.com
              │   (Contains: name, email, message)
              │
              └─→ Send Email #2: Customer Confirmation
                  To: customer@their-email.com
                  From: mouhanned.jawadi23@gmail.com
                  (Says: "Thanks, we'll respond soon")
```

---

## 📂 Files Created/Modified

### New Files:
- `netlify/functions/send-email.js` - Email sending function
- `.env.example` - Example environment variables
- `src/config/emailConfig.js` - Email configuration

### Modified Files:
- `src/App.jsx` - Updated to call Netlify function
- `package.json` - Added nodemailer

---

## ✅ Deployment Checklist

Before going live:

- [ ] Run `npm install` locally
- [ ] Test contact form locally (emails show in console)
- [ ] Push code to GitHub
- [ ] Add environment variables in Netlify Dashboard
- [ ] Trigger deployment
- [ ] Test contact form on live site
- [ ] Check both email addresses receive emails

---

## 🐛 Troubleshooting

### "Build failed" on Netlify
- Check build logs: Deployments → view logs
- Make sure all imports are correct
- Try `npm install` again locally

### "Email not received"
1. Check Netlify function is getting called (browser console)
2. Check Netlify Build logs
3. Verify environment variables are set
4. Check spam/promotions folder
5. Try submitting again

### "SMTP Error: Login failed"
- Gmail app password might be wrong
- Make sure it's: `szyi fhcx jprn eket` (exact match)
- Check for extra spaces

### "Contact form hangs/doesn't respond"
- Check Netlify function status
- Check browser console (F12) for errors
- Hard refresh page (Ctrl+Shift+R)

---

## 📧 Email Examples

### What Admin Receives:
```
To: queenbags.mika@gmail.com
From: mouhanned.jawadi23@gmail.com
Subject: New Contact from QueensBags Website 📧

Name: Sara Queen
Email: sara@example.com

Message:
I want to order Queen #2 in berry with gold strap

---
Reply directly to: sara@example.com
```

### What Customer Receives:
```
To: sara@example.com
From: mouhanned.jawadi23@gmail.com
Subject: QueensBags - We received your message! 👑

Dear Sara Queen,

Thank you for contacting QueensBags! We received your request 
and will review it shortly.

We'll get back to you as quickly as possible with all the 
details you need.

Best regards,
The QueensBags Team
```

---

## 🔒 Security Notes

✅ Good practices:
- Credentials in environment variables (not in code)
- .env file in .gitignore (not committed to GitHub)
- HTML sanitization to prevent injection

⚠️ Important:
- Never share your app password publicly
- Don't commit credentials to GitHub
- Netlify dashboard access is encrypted

---

## 📞 Support

If emails aren't working after deployment:

1. **Check Netlify Logs**
   - Deployments → Latest Deploy → View logs
   - Look for errors with "send-email"

2. **Verify Configuration**
   - Settings → Environment
   - Confirm GMAIL_USER and GMAIL_PASS are set

3. **Re-deploy**
   - Go to Deployments → Trigger Deploy

4. **Test Form Again**
   - Contact form on live site
   - Check both email addresses

---

## ✨ You're All Set!

Everything is configured and ready to deploy. Just:

1. Add the environment variables to Netlify
2. Deploy your code
3. Test the contact form

**Your site will send automatic emails to customers!** 🎉

---

**Credentials Summary:**
- Gmail Account: mouhanned.jawadi23@gmail.com
- Gmail App Password: szyi fhcx jprn eket
- Admin Email: queenbags.mika@gmail.com
- Admin Panel: yoursite.com/#admin
