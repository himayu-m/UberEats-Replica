const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

async function handle_request(msg, callback) {

}

exports.handle_request = handle_request;

