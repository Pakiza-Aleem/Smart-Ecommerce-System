// config/cloudinary.js - configures the Cloudinary SDK from server-only env vars.
// This file (and the credentials it reads) never runs in the browser - it's
// required only by backend controllers, so the API secret is never shipped
// to the frontend.

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // always return https:// URLs
});

module.exports = cloudinary;
