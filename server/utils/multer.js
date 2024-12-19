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
    const ext = file.mimetype.split("/")[1];
    // cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    cb(null, `user-${Date.now()}.${ext}`);
    // crypto.randomBytes(10, (err, bytes) => {
    //   const fileName = bytes.toString("hex") + path.extname(file.originalname);
    //   cb(null, fileName);
    // });
  },
});

//CHECKING IMAGES OR NOT
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Images only");
  }
};
const upload = multer({ storage: storage, fileFilter: multerFilter });
module.exports = upload;
