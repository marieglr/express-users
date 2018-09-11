const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "user-pictures",
  // in case you want to upload things that aren't pictures
  params: {
    resource_type: "raw"
  },
});

const fileUploader = multer({ storage });

module.exports = fileUploader;
