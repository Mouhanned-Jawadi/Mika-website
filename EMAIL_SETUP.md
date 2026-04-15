# Email Configuration for QueensBags

## ✅ Gmail SMTP Setup (Already Configured!)

Your email is already set up to use **Gmail SMTP** with these credentials:

- **Email:** mouhanned.jawadi23@gmail.com
- **App Password:** szyi fhcx jprn eket
- **Admin Receives Emails At:** queenbags.mika@gmail.com
- **Customers Receive Confirmation From:** mouhanned.jawadi23@gmail.com

---

## 🚀 How It Works

### Customer Submits Contact Form
```
Customer fills form with name, email, message
           ↓
Form sends to Netlify Function
           ↓
Function uses Gmail SMTP to send:
  1. Admin notification to queenbags.mika@gmail.com
  2. Confirmation to customer's email
           ↓
Customer sees "Email sent successfully" notification
```

### Admin Receives Email
```
To: queenbags.mika@gmail.com
From: mouhanned.jawadi23@gmail.com
Subject: New Contact from QueensBags Website 📧

Contains:
- Customer name
- Customer email
- Full message
- Reply button to respond directly
```

### Customer Receives Confirmation
```
To: customer@email.com
From: mouhanned.jawadi23@gmail.com
Subject: QueensBags - We received your message! 👑

Message thanks them and says we'll respond soon
```

---

## 🔧 Deployment Instructions

### Before Deploying to Netlify

1. **Set Environment Variables in Netlify Dashboard**
   - Go to your Netlify site
   - Settings → Environment → Add variables
   - Add these two variables:
     ```
     GMAIL_USER = mouhanned.jawadi23@gmail.com
     GMAIL_PASS = szyi fhcx jprn eket
     ```

2. **Or Use .env File (Local Development)**
   - Create `netlify.toml` (already exists)
   - Create `.env` file:
     ```
     VITE_GMAIL_USER=mouhanned.jawadi23@gmail.com
     ```

### Deploy Steps
```bash
# 1. Install dependencies (includes nodemailer)
npm install

# 2. Test locally
npm run dev

# 3. Push to GitHub
git add .
git commit -m "Add email functionality"
git push

# 4. Netlify automatically builds and deploys
# Check https://app.netlify.com for build status
```

---

## 📧 Testing Email Sending

### Local Development
```bash
npm run dev
```
- Emails log to console (not actually sent)
- Check browser console for mock email output
- Helps test form without sending real emails

### After Deploying to Netlify
```
1. Go to https://your-domain.netlify.app
2. Fill contact form
3. Click "Send request"
4. Check:
   - your email (confirmation)
   - queenbags.mika@gmail.com (admin notification)
```

---

## ✉️ Email Files

- **send-email.js** - Netlify function that sends emails
- **emailConfig.js** - Email configuration and templates
- **App.jsx** - Contact form that calls the function

---

## 🔒 Security Notes

✅ **Good Practices Used:**
- Credentials stored as environment variables (not in code)
- HTML sanitization to prevent injection
- Only POST requests accepted
- Error handling and logging

⚠️ **Important:**
- Don't commit `.env` file to GitHub
- Netlify dashboard variables are encrypted
- Use app password (not Gmail password) for security

---

## 🛠️ Troubleshooting

### "Email not sending"
1. Check Netlify build logs (builds → view logs)
2. Check browser console (F12) for errors
3. Verify environment variables are set in Netlify
4. Check GMAIL_PASS is exactly: `szyi fhcx jprn eket`

### "SMTP Error: Login failed"
- App password might be wrong
- Make sure it's the **app password**, not your Gmail password
- Regenerate if needed: https://myaccount.google.com/apppasswords

### "No confirmation email received"
- Always check spam/promotions folder
- Verify customer email address is correct
- Check form actually submitted (should see success message)

### "Admin email not going to Mika"
- Verify `queenbags.mika@gmail.com` is correct
- Check Netlify environment variables are saved
- Re-deploy after changing variables

---

## 📱 Changing Email Settings

**To change which email the admin receives:**
1. Open `netlify/functions/send-email.js`
2. Find line with `queenbags.mika@gmail.com`
3. Replace with your email
4. Redeploy

**To use different Gmail account:**
1. Set new credentials in Netlify environment variables
2. Update both `GMAIL_USER` and `GMAIL_PASS`
3. Redeploy

---

## 🎯 Email Templates

### Admin Notification Template
Includes:
- Customer name
- Customer email (clickable to reply)
- Full message
- Professional formatting

### Customer Confirmation Template
Includes:
- Personalized greeting
- Confirmation message
- Contact information
- Instagram link

Edit templates in `src/config/emailConfig.js`

---

## ✨ Final Checklist

- ✅ Email configured in emailConfig.js
- ✅ Netlify function created (send-email.js)
- ✅ nodemailer added to package.json
- ✅ Contact form updated to use function
- ✅ Environment variables ready
- ✅ Admin email: queenbags.mika@gmail.com
- ✅ Gmail account: mouhanned.jawadi23@gmail.com

**You're all set! Emails will send automatically after deployment.** 🎉

---

## 🚀 Next Steps

1. `npm install` (install nodemailer)
2. Deploy to Netlify
3. Set environment variables in Netlify dashboard
4. Test the contact form
5. Check both email addresses for success!

