var multer = require("multer");
const path = require("path");

exports.upload = (fieldName) => {
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${file.fielName}`);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  let validExtension, fileType, maxSize, limitSize;

  // Set File Filter
  const pdfFilter = (req, file, cb) => {
    if (file.fieldname === "file") {
      validExtension = /\.PDF|pdf|$/;
      fileType = "pdf";
      maxSize = 10 * 1000 * 1000;
      limitSize = "10 MB";
    } else {
      validExtension = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/;
      fileType = "image";
      maxSize = 2 * 1000 * 1000;
      limitSize = "2 MB";
    }

    const extname = path.extname(file.originalname).toLowerCase();
    if (!extname.match(validExtension)) {
      req.fileValidationError = {
        status: "fail",
        message: `Please select an ${fileType} file!`,
        code: 400,
      };
      return cb(new Error(`Please select an ${fileType} file!`), false);
    }
    cb(null, true);
  };

  // init upload
  let upload;
  if (fieldName === "picture") {
    upload = multer({
      storage,
      limits: {
        fileSize: maxSize,
      },
    }).single(fieldName);
  } else {
    upload = multer({
      storage,
      pdfFilter,
      limits: {
        fileSize: maxSize,
      },
    }).fields([{ name: "thumbnail" }, { name: "file" }]);
  }

  // const pdfFilter = (req, file, cb) => {
  //   if (file.fieldname === "file") {
  //     if (!file.originalname.match(/\.PDF|pdf|$/)) {
  //       req.fileValidationError = {
  //         message: "Only PDF file are allowed",
  //       };
  //       return cb(new Error("Only PDF file are allowed"), false);
  //     } else {
  //       if (
  //         !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
  //       ) {
  //         req.fileValidationError = {
  //           message: "Only image files are allowed!",
  //         };
  //         return cb(new Error("Only image files are allowed!"), false);
  //       }
  //     }
  //   }
  //   cb(null, true);
  // };

  // const maxSize = 10 * 1000 * 1000;

  // const upload = multer({
  //   storage,
  //   fileFilter: pdfFilter,
  //   limits: {
  //     fileSize: maxSize,
  //   },
  // }).single(fileName);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.file && !req.files && !err)
        return res.status(400).send({
          message: "Please select file to upload",
        });

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: `Max file size is ${limitSize}`,
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
