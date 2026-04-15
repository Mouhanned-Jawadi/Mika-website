/**
 * Netlify Function: Send Email via Gmail SMTP
 * Handles both admin notifications and customer confirmations
 * 
 * Requires environment variables:
 * - GMAIL_USER: your Gmail address
 * - GMAIL_PASS: your Gmail app password (not regular password)
 */

const nodemailer = require('nodemailer')

// Create transporter with Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.GMAIL_USER || 'mouhanned.jawadi23@gmail.com',
      pass: process.env.GMAIL_PASS || 'szyi fhcx jprn eket',
    },
  })
}

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { name, email, message, type } = JSON.parse(event.body)

    // Validate input
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      }
    }

    if (type === 'admin' && !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' }),
      }
    }

    const adminEmail = 'queenbags.mika@gmail.com'
    const fromEmail = process.env.GMAIL_USER || 'mouhanned.jawadi23@gmail.com'

    let mailOptions = {}

    if (type === 'admin') {
      // Send admin notification
      mailOptions = {
        from: `QueensBags <${fromEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: 'New Contact from QueensBags Website 📧',
        html: `
          <h2>New Message from QueensBags Contact Form</h2>
          <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${sanitizeHtml(email)}">${sanitizeHtml(email)}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
            ${sanitizeHtml(message).replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><em>Reply directly to: ${sanitizeHtml(email)}</em></p>
        `,
        text: `
New message from QueensBags contact form:

Name: ${name}
Email: ${email}

Message:
${message}

---
Reply directly to: ${email}
        `,
      }
    } else if (type === 'confirmation') {
      // Send confirmation to customer
      mailOptions = {
        from: `QueensBags <${fromEmail}>`,
        to: email,
        replyTo: adminEmail,
        subject: 'QueensBags - We received your message! 👑',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank You for Contacting QueensBags!</h2>
            <p>Dear ${sanitizeHtml(name)},</p>
            <p>We received your request and will review it shortly.</p>
            <p>We'll get back to you as quickly as possible with all the details you need.</p>
            <hr style="margin: 30px 0;">
            <p><strong>Best regards,</strong></p>
            <p>
              The QueensBags Team<br>
              📧 <a href="mailto:queenbags.mika@gmail.com">queenbags.mika@gmail.com</a><br>
              📱 +216-29043226<br>
              📸 <a href="https://www.instagram.com/queenbags_mika/">@queenbags_mika</a>
            </p>
          </div>
        `,
        text: `
Dear ${name},

Thank you for contacting QueensBags! We received your request and will review it shortly.

We'll get back to you as quickly as possible with all the details you need.

Best regards,
The QueensBags Team
💌 queenbags.mika@gmail.com
📱 +216-29043226
📸 @queenbags_mika on Instagram
        `,
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email type' }),
      }
    }

    // In development, just log
    if (process.env.NODE_ENV !== 'production' || process.env.DEV_MODE === 'true') {
      console.log('📧 [Dev Mode] Email would be sent:', {
        to: mailOptions.to,
        subject: mailOptions.subject,
        timestamp: new Date().toISOString(),
      })
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Email logged (dev mode)',
          devMode: true,
        }),
      }
    }

    // In production, actually send the email
    const transporter = createTransporter()

    // Send mail
    const info = await transporter.sendMail(mailOptions)

    console.log('✅ Email sent:', info.messageId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: `Email sent successfully to ${mailOptions.to}`,
        messageId: info.messageId,
      }),
    }
  } catch (error) {
    console.error('❌ Email error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message,
      }),
    }
  }
}

/**
 * Sanitize HTML to prevent injection
 */
function sanitizeHtml(str) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
