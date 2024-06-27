const express = require('express');
const nodemailer = require('nodemailer');
const ContactFormSubmission = require('../models/ContactFormSubmission');
const router = express.Router();

router.post('/submit-contact-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const submission = new ContactFormSubmission({ name, email, message });
    await submission.save().then(() => console.log('Contact form submission saved to MongoDB.')).catch((error) => {
      console.error('Error saving contact form submission to MongoDB:', error);
      throw error; // Rethrow the error after logging
    });

    // Send email
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptionsToCompany = {
      from: `"KloudKiq Contact Form" <${process.env.EMAIL_USER}>`, // sender address
      to: process.env.COMPANY_EMAIL, // list of receivers
      subject: "New Contact Form Submission", // Subject line
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
      html: `<b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}` // html body
    };

    const mailOptionsToSender = {
      from: `"KloudKiq" <${process.env.EMAIL_USER}>`, // sender address
      to: email, // receiver, the person who filled the form
      subject: "Your Contact Form Submission", // Subject line
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest,\nThe KloudKiq Team`, // plain text body
      html: `<p>Hello ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p><p>Best,</p><p>The KloudKiq Team</p>` // html body
    };

    // Send email to company
    await transporter.sendMail(mailOptionsToCompany).then(info => {
      console.log('Message sent to company: %s', info.messageId);
    }).catch(error => {
      console.error('Error sending email to company:', error);
      throw error; // Rethrow the error after logging
    });

    // Send confirmation email to the user
    await transporter.sendMail(mailOptionsToSender).then(info => {
      console.log('Confirmation message sent to sender: %s', info.messageId);
    }).catch(error => {
      console.error('Error sending confirmation email to sender:', error);
      throw error; // Rethrow the error after logging
    });

    res.redirect('/contact?success=true');
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.redirect('/contact?error=true');
  }
});

module.exports = router;