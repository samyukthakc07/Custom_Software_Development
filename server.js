import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

console.log("Email configuration:", {
  userConfigured: Boolean(process.env.EMAIL_USER),
  passwordConfigured: Boolean(process.env.EMAIL_APP_PASSWORD),
  recipientConfigured: Boolean(process.env.EMAIL_TO),
});

if (!process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_APP_PASSWORD === 'PASTE_GMAIL_APP_PASSWORD_HERE') {
  console.log(`------------------------------------------------
EMAIL CONFIGURATION REQUIRED

Open the .env file and replace:
PASTE_GMAIL_APP_PASSWORD_HERE
with the Gmail App Password for:
thehackersinfotech@gmail.com

Then restart:
npm run dev
------------------------------------------------`);
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Very basic rate limiting
const rateLimitMap = new Map();

app.post('/api/contact', async (req, res) => {
  console.log('Contact submission received');
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  if (rateLimitMap.has(ip)) {
    const lastTime = rateLimitMap.get(ip);
    if (now - lastTime < 10000) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
  }
  rateLimitMap.set(ip, now);

  const {
    _honeypot,
    fullName,
    companyName,
    email,
    mobile,
    requirementType,
    budgetRange,
    projectTimeline,
    requirementDetails
  } = req.body;

  console.log({
    fullNamePresent: Boolean(fullName),
    emailPresent: Boolean(email),
    mobilePresent: Boolean(mobile),
    requirementTypePresent: Boolean(requirementType),
    requirementDetailsPresent: Boolean(requirementDetails)
  });

  // Spam protection
  if (_honeypot) {
    return res.status(400).json({ error: 'Spam detected' });
  }

  // Validation
  if (!fullName || !email || !mobile || !requirementType || !requirementDetails) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (fullName.length > 100 || email.length > 150 || mobile.length > 25 || requirementDetails.length > 2000) {
    return res.status(400).json({ error: 'Input length exceeded limit' });
  }

  // Determine Subject
  let subject = `New Hackers Infotech Inquiry — ${fullName} — ${requirementType}`;
  if (requirementType === 'Book a Demo / Consultation') {
    subject = `Demo Request — ${fullName} ${companyName ? `— ${companyName}` : ''}`;
  }

  const emailBodyText = `NEW WEBSITE INQUIRY
HACKERS INFOTECH

A new customer inquiry has been submitted through the
Hackers Infotech website.

CUSTOMER DETAILS

Name:
${fullName}

Company / Business:
${companyName || 'Not provided'}

Email:
${email}

Mobile / WhatsApp:
${mobile}


PROJECT DETAILS

Requirement:
${requirementType}

Budget Range:
${budgetRange || 'Not provided'}

Project Timeline:
${projectTimeline || 'Not provided'}


CUSTOMER MESSAGE

${requirementDetails}


SUBMISSION INFORMATION

Source:
Hackers Infotech Website

Submitted At:
${new Date().toISOString()}
`;

  const emailBodyHtml = `
    <h2>NEW WEBSITE INQUIRY<br>HACKERS INFOTECH</h2>
    <p>A new customer inquiry has been submitted through the Hackers Infotech website.</p>
    
    <h3>CUSTOMER DETAILS</h3>
    <p><strong>Name:</strong><br>${fullName}</p>
    <p><strong>Company / Business:</strong><br>${companyName || 'Not provided'}</p>
    <p><strong>Email:</strong><br><a href="mailto:${email}">${email}</a></p>
    <p><strong>Mobile / WhatsApp:</strong><br>
      <a href="tel:${mobile.replace(/[^0-9+]/g, '')}">${mobile}</a><br>
      <a href="https://wa.me/${mobile.replace(/[^0-9+]/g, '')}">Message on WhatsApp</a>
    </p>

    <h3>PROJECT DETAILS</h3>
    <p><strong>Requirement:</strong><br>${requirementType}</p>
    <p><strong>Budget Range:</strong><br>${budgetRange || 'Not provided'}</p>
    <p><strong>Project Timeline:</strong><br>${projectTimeline || 'Not provided'}</p>

    <h3>CUSTOMER MESSAGE</h3>
    <p>${requirementDetails.replace(/\\n/g, '<br>')}</p>

    <h3>SUBMISSION INFORMATION</h3>
    <p><strong>Source:</strong> Hackers Infotech Website<br>
    <strong>Submitted At:</strong> ${new Date().toISOString()}</p>
  `;

  console.log('Attempting email delivery...');
  const appPassword = process.env.EMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  
  if (!process.env.EMAIL_USER || !appPassword || appPassword === 'PASTE_GMAIL_APP_PASSWORD_HERE') {
    console.error('Email delivery failed: Gmail credentials not configured in .env');
    return res.status(500).json({ success: false, message: 'Server email configuration is missing' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: appPassword,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@hackersinfotech.com',
      to: process.env.EMAIL_TO || 'thehackersinfotech@gmail.com',
      replyTo: email,
      subject: subject,
      text: emailBodyText,
      html: emailBodyHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.messageId}`);
    res.status(200).json({ success: true, message: 'Inquiry email sent successfully' });
  } catch (error) {
    console.error("EMAIL DELIVERY FAILED");
    console.error({
      code: error.code,
      responseCode: error.responseCode,
      command: error.command,
      message: error.message
    });
    return res.status(500).json({
      success: false,
      message: "Unable to send inquiry"
    });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Verify SMTP on startup
(async () => {
  const appPassword = process.env.EMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!process.env.EMAIL_USER || !appPassword || appPassword === 'PASTE_GMAIL_APP_PASSWORD_HERE') {
    console.log("Email server verify skipped: Real credentials not yet configured in .env");
    return;
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: appPassword,
      },
    });
    await transporter.verify();
    console.log(`========================================
EMAIL SERVER READY
Gmail SMTP authentication successful.
Sender: ${process.env.EMAIL_USER}
Recipient: ${process.env.EMAIL_TO || 'thehackersinfotech@gmail.com'}
========================================`);
  } catch (err) {
    console.error('Email server authentication failed on startup:', err.message);
  }
})();

app.listen(port, () => {
  console.log(`Contact API started on port ${port}`);
});
