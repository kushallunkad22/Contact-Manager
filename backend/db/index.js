// backend/models/contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    company: String,
    jobTitle: String,
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = { Contact };
