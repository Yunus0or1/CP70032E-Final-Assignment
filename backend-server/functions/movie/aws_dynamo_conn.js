let AWS = require("aws-sdk");
require("dotenv").config();

let secretAccessKey = process.env.secretAccessKey
let accessKeyId = process.env.accessKeyId

AWS.config.update({
  credentials: {
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKeyId,
  },
  region: "us-east-1",
  maxRetries: 1,
});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;