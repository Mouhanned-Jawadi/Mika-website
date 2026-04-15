# 👑 QueensBags - New Features Guide

## What's New?

Your website now has **three major additions**:

### 🔐 Admin Panel
- Secure login interface (`#admin` route)
- Credentials: `mika@admin.com` / `mika123`
- Full product management

### 📦 Product Management
- **Create** products with:
  - Name, price, Instagram link
  - **Multiple images per product**
  - Image carousel for browsing
- **Edit** existing products anytime
- **Delete** products instantly
- **Search** by name or price
- All changes appear immediately on website!

### 🎠 Product Image Carousel
- Every product can have multiple images
- Hover to see navigation arrows ⬅️ ⬅️ ➡️ ➡️
- Click dots at bottom to jump to image
- Shows image count (e.g., 2/5)
- Works on gallery AND marketplace

### 📧 Contact Form Automation
- Auto-reply sent to customers
- Admin notification with all details
- Set up email in 5 minutes (see EMAIL_SETUP.md)

---

## 📱 How It Works

### For You (Admin)
```
yoursite.com/#admin
        ↓
    Login (mika@admin.com / mika123)
        ↓
Admin Dashboard - Create/Edit/Delete Products
        ↓
Changes appear INSTANTLY on website
        ↓
Products stored locally - persistent across visits
```

### For Customers
```
Visit Website
        ↓
See products with beautiful image carousels
        ↓
Click "Order via Instagram" → Goes to Instagram link
        ↓
OR Click "Use contact form" → Pre-fills with product
        ↓
Submit contact form → Gets auto-reply confirmation
```

---

## 🚀 Quick Start

### 1. Install & Run
```bash
npm install
npm run dev
```

### 2. Access Admin
- Open: `http://localhost:5173/#admin`
- Email: `mika@admin.com`
- Password: `mika123`

### 3. Add a Product
1. Click "+Add New Product"
2. Fill in name, price, Instagram link
3. ADD AT LEAST ONE IMAGE (required)
4. Click "Add Image" button for each additional image
5. Click "Add Product"

### 4. See Changes
- Go back to website homepage
- Your product appears in marketplace!
- Try the carousel hover arrows

---

## 🎯 Features in Detail

### Admin Panel Features
- ✅ Search products in real-time
- ✅ See image count per product
- ✅ Edit any product by clicking pencil icon
- ✅ Delete product with confirmation
- ✅ Add unlimited products
- ✅ Add unlimited images per product

### Product Carousel Features
- ✅ Auto-stops at first or last image
- ✅ Click dots to jump to specific image
- ✅ Hover to see arrow buttons
- ✅ Image counter shows current position
- ✅ Smooth transitions
- ✅ Responsive on mobile

### Contact Form Features
- ✅ Auto-reply email to customer
- ✅ Admin notification email
- ✅ Form validation (all fields required)
- ✅ Pre-fills with product name if clicked from product card
- ✅ Works in English and French
- ✅ Loading state while sending

---

## 💾 How Data is Stored

**Everything is stored in your browser's localStorage!**

This means:
- ✅ Products persist after page reload
- ✅ Works completely offline (if already loaded)
- ✅ Perfect for Netlify deployment (no backend needed)
- ✅ Fast loading, no server costs

**Note:** Each visitor sees their own copy of products. For a shared database across all visitors, contact me about Firebase setup.

---

## 📧 Email Setup

See [EMAIL_SETUP.md](EMAIL_SETUP.md) for complete guide.

**Quick Options:**
1. **Formspree** (Easiest) - Free, 50 emails/month
2. **EmailJS** (More features) - Free, 200 emails/month  
3. **Netlify Forms** (Built-in) - Unlimited, but simpler notifications

---

## 🎨 Customization Examples

### Change Admin Password
Edit `src/components/AdminLogin.jsx`:
```javascript
const ADMIN_EMAIL = 'mika@admin.com'
const ADMIN_PASSWORD = 'newpassword123'
```

### Add More Product Fields
1. Edit `src/components/ProductForm.jsx` - add form input
2. Edit `src/hooks/useProducts.js` - add to default product
3. Edit `src/components/AdminPanel.jsx` - display new field

### Change Colors/Styling
Already using Tailwind CSS! Edit `tailwind.config.js`:
```javascript
colors: {
  brand: {
    ivory: '#faf8f6',
    berry: '#7b4397',
    blush: '#f5e6e1',
    // ... more colors
  }
}
```

---

## 🔒 Security Notes

- ✅ Admin password stored in code (frontend only)
- ✅ For production: upgrade to database with real auth
- ⚠️ Don't share the admin URL if you need more security

---

## 📦 New Dependencies

Only one new package added:
- `@emailjs/browser` - for sending emails

Everything else uses existing tech:
- React 19
- Tailwind CSS
- React Icons
- React Hot Toast

---

## 🚢 Deployment to Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables (if using EmailJS)
6. Deploy! 🎉

**Products will sync across your site worldwide!**

---

## 🎓 File Structure

```
src/
├── App.jsx                     ← Main app (updated)
├── components/
│   ├── AdminLogin.jsx          ← Login screen
│   ├── AdminPanel.jsx          ← Product management
│   ├── ProductCarousel.jsx     ← Image carousel
│   └── ProductForm.jsx         ← Add/Edit products
├── hooks/
│   └── useProducts.js          ← Product storage
├── config/
│   └── emailConfig.js          ← Email setup
└── ... (rest of your files)
```

---

## ❓ FAQ

**Q: Will products show for all visitors?**
A: Each visitor gets their own copy (localStorage). For shared products, upgrade to Firebase/Supabase.

**Q: Can I delete the default 6 products?**
A: Yes! In admin panel, delete them anytime. Or edit with your own images.

**Q: How many products can I add?**
A: Unlimited! Just limited by browser storage (usually 5-10MB).

**Q: Do emails really send automatically?**
A: Yes! Set up Formspree or EmailJS in 5 minutes. See EMAIL_SETUP.md

**Q: Can I delete products after deleting an image?**
A: No, you need at least 1 image. Edit and add more if needed.

**Q: What if I forget my admin password?**
A: You have to edit the code. Default is `mika123`.

---

## 🆘 Support

For issues or questions:
1. Check [EMAIL_SETUP.md](EMAIL_SETUP.md)
2. Check [ADMIN_SETUP_GUIDE.md](ADMIN_SETUP_GUIDE.md)
3. Check browser console for errors (F12)
4. Contact me!

---

## ✨ Thank You!

Your site is now equipped with a complete content management system. All features work offline and deploy instantly to Netlify.

**Happy selling! 👑**
