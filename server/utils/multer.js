const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./server/public/images");
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(10, (err, bytes) => {
//       const fileName = bytes.toString("hex") + path.extname(file.originalname);
//       cb(null, fileName);
//     });
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(10, (err, bytes) => {
      const fileName = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fileName);
    });
  },
});

// function checkFileType(file, cb) {
//   const allow = /jpg|jpeg|png/;
//   const extname = allow.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allow.test(file.mimetype);
//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("Images only");
//   }
// }

const upload = multer({ storage: storage });
module.exports = upload;
