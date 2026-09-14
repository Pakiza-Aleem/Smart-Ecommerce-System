// middleware/upload.js - parses multipart/form-data product image uploads.
//
// Uses memoryStorage (not diskStorage): the file only ever exists as an
// in-memory Buffer (req.file.buffer). It is never written to the server's
// filesystem, and is discarded automatically once the request finishes.
// The controller streams that buffer straight to Cloudinary.

const multer = require('multer');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function fileFilter(req, file, cb) {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, WEBP, or GIF images are allowed'));
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = upload;
