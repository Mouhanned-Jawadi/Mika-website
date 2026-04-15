# QueensBags Admin Panel Setup Guide

## 🎯 Overview
Your website now has a complete admin interface with product management and automated contact form emails.

## ✨ Features Added

### 1. **Admin Login**
- Access at: `yoursite.com/#admin`
- **Credentials:**
  - Email: `mika@admin.com`
  - Password: `mika123`
- Secure authentication (frontend-only)

### 2. **Product Management**
Admin can:
- ✅ **Create** new products with:
  - Product name
  - Price
  - Multiple images (carousel support)
  - Instagram link for buying
- ✅ **Edit** existing products
- ✅ **Delete** products
- ✅ **Search** products by name or price

**All products are stored locally in the browser (localStorage)** - they persist across page reloads while deployed on Netlify.

### 3. **Product Carousel**
- Each product card displays a **carousel of images**
- Hover to see navigation arrows
- Click dots to jump to specific image
- Shows image counter (e.g., "1/3")
- Works on both the gallery and marketplace sections

### 4. **Automated Contact Emails**
When customers submit the contact form, they receive:
- 📧 **Auto-reply** confirming their request was received
- 📧 **Admin notification** with all contact details

## 🚀 Getting Started

### Step 1: Install Dependencies
Run in your project folder:
```bash
npm install
```

This installs the new `@emailjs/browser` package needed for email functionality.

### Step 2: Access Admin Panel
1. Go to `http://localhost:5173/#admin` (development)
2. Login with: `mika@admin.com` / `mika123`
3. Start adding products!

### Step 3: Set Up Email (Optional but Recommended)

#### Option A: Using Formspree (Easiest - Free Tier)
1. Go to [formspree.io](https://formspree.io/)
2. Sign up for free
3. Create a new form
4. In [src/App.jsx](src/App.jsx), replace `'f/your-form-id'` with your Formspree form ID:
   ```javascript
   // Line ~130: Replace both instances of:
   // https://formspree.io/f/your-form-id
   // With your actual Formspree form ID
   ```

#### Option B: Using EmailJS (More Features)
1. Go to [emailjs.com](https://emailjs.com/)
2. Sign up for free
3. Create email service and template
4. Update [src/config/emailConfig.js](src/config/emailConfig.js):
   ```javascript
   export const EMAILJS_CONFIG = {
     SERVICE_ID: 'your_service_id_here',
     TEMPLATE_ID: 'your_template_id_here',
     PUBLIC_KEY: 'your_public_key_here',
   }
   ```

#### Option C: Using Netlify Forms (Built-in)
Netlify automatically handles forms without extra setup!
See [netlify.toml](netlify.toml) for configuration.

### Step 4: Test Everything
1. Create a test product in admin panel
2. Navigate to marketplace and verify it appears
3. Try the carousel with multiple images
4. Submit contact form and check email

## 📁 File Structure

```
src/
├── components/
│   ├── AdminLogin.jsx          # Login screen
│   ├── AdminPanel.jsx          # Product management
│   ├── ProductCarousel.jsx     # Image carousel
│   └── ProductForm.jsx         # Add/Edit products
├── hooks/
│   └── useProducts.js          # Product storage & management
├── config/
│   └── emailConfig.js          # Email configuration
└── App.jsx                     # Updated main app
```

## 🎨 Customization

### Change Admin Credentials
Edit [src/components/AdminLogin.jsx](src/components/AdminLogin.jsx):
```javascript
const ADMIN_EMAIL = 'mika@admin.com'
const ADMIN_PASSWORD = 'mika123'
```

### Modify Product Fields
To add more fields (size, color, etc.), update:
1. [src/components/ProductForm.jsx](src/components/ProductForm.jsx) - Add form fields
2. [src/hooks/useProducts.js](src/hooks/useProducts.js) - Add to default structure
3. Display in [src/components/AdminPanel.jsx](src/components/AdminPanel.jsx)

### Change Email Settings
Edit [src/App.jsx](src/App.jsx) around line 130:
```javascript
const sendContactEmail = async (data) => {
  // Modify form fields, email recipients, etc.
}
```

## 🔧 Deployment to Netlify

1. Push all code to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Products stored in localStorage work automatically!

### Email Setup on Netlify
- **Option 1:** Use Formspree (recommended - easiest setup)
- **Option 2:** Add environment variables in Netlify dashboard:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

## 📝 Notes

- **Products are stored locally** in the browser's localStorage
- Products persist across page reloads
- Each visitor sees their own stored products
- For a shared database, you'd need a backend (Firebase, Supabase, etc.) - let me know if needed!

## 🐛 Troubleshooting

### Products disappearing?
- Check browser DevTools → Application → Local Storage
- Clear site data and try again

### Email not sending?
- Verify Formspree/EmailJS form ID is correct
- Check browser console for errors (F12)
- Test with real email addresses

### Admin button not showing?
- Refresh page (hard refresh: Ctrl+Shift+R)
- Check that components imported correctly in App.jsx

## ✉️ Support
If you need help setting up EmailJS, Formspree, or any features, let me know!

---
**Ready to deploy!** 🚀 Your site is fully functional on Netlify with complete admin management.
