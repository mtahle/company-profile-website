const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const ContactFormSubmission = mongoose.model('ContactFormSubmission', contactFormSchema);

module.exports = ContactFormSubmission;