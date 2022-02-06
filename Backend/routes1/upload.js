const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const { checkAuth } = require("../config/passport");

const s3 = new aws.S3({
    accessKeyId:  process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: '273ubereats'
  });

router.post('/api/upload', checkAuth, (req, res) => {
  // console.log("key" + s3.accessKeyId);
  // console.log("secretAccessKey" + s3.secretAccessKey);
  uploadImg(req, res, (error) => {
    if (error) {
      console.log('Error on image upload', error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        res.json('No File Selected');
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        if (isEmpty(imageName) || isEmpty(imageLocation)) {
          return res.status(400).send("Image data doesn't exist");
        } 
        else {
            return res.status(200).json({"imageLocation": imageLocation})
        }
      }
    }
  });
});

const uploadImg = multer({
  storage: multerS3({
    s3: s3,
    bucket: '273ubereats',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: { fileSize: 2000000 }, // 2 MB
  fileFilter: function (req, file, cb) {
    console.log(file.originalname)
    validateFileType(file, cb);
  }
}).single('file');

function validateFileType(file, cb) {
  const allowedFileType = /jpeg|jpg|png|gif|jfif/;
  const mimeType = allowedFileType.test(file.mimetype);
  const extname = allowedFileType.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

function isEmpty(value) {
  return (value === undefined || value == null || value.length <= 0) ? true : false;
}

module.exports = router;

