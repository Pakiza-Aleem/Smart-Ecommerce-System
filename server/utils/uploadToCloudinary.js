// utils/uploadToCloudinary.js - streams a Buffer (from Multer's memoryStorage)
// straight to Cloudinary, with no temp file written to disk at any point.

const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');

function uploadBufferToCloudinary(buffer, folder = 'zentro/products') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result); // result.secure_url is what we store in MongoDB
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

module.exports = { uploadBufferToCloudinary };
