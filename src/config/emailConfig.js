/**
 * SMTP Email Configuration for QueensBags
 * Using Gmail SMTP with App Password
 */

export const SMTP_CONFIG = {
  // Gmail SMTP Settings
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  
  // Gmail Account Credentials
  user: 'mouhanned.jawadi23@gmail.com',
  pass: 'szyi fhcx jprn eket', // App password (not regular password)
  
  // Email Settings
  from: 'mouhannah.jawadi23@gmail.com',
  fromName: 'QueensBags - Mika',
  replyTo: 'mouhanned.jawadi23@gmail.com',
  
  // Admin Notification
  adminEmail: 'queenbags.mika@gmail.com', // Where admin notifications go
}

/**
 * Email Templates
 */
export const EMAIL_TEMPLATES = {
  // Contact form received - send to customer
  customerConfirmation: {
    subject: 'QueensBags - We received your message! 👑',
    text: `Dear {{name}},

Thank you for contacting QueensBags! We received your request and will review it shortly.

We'll get back to you as quickly as possible with all the details you need.

Your Message:
{{message}}

Best regards,
The QueensBags Team
💌 queenbags.mika@gmail.com`,
  },

  // Contact form submission - send to admin
  adminNotification: {
    subject: 'New Contact from QueensBags Website 📧',
    text: `New message from QueensBags contact form:

Name: {{name}}
Email: {{email}}

Message:
{{message}}

---
Reply directly to: {{email}}`,
  },
}

export const CONTACT_EMAIL = 'queenbags.mika@gmail.com'

