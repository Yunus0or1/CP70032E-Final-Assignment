let docClient = require('./aws_dynamo_conn');
require("dotenv").config();

var params = {
  TableName: 'movie',
  Key: {
    "id": '1',
    "createdTime": 1
  }
};

async function checkDBConn() {
  try {
    const data = await docClient.get(params).promise();
    if (data) return true
  } catch (error) {
    console.log(error.name + ':' + error.message,)
    console.log('File/Method: db_conn/checkDBConn()')
    return false
  }
}

module.exports = checkDBConn;