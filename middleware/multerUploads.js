const multer = require("multer");
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpeg|jpe|png|gif$i/)) {
      cb(new Error("File type not supported"), false);
      return;
    }
    cb(null, true);
  },
});

