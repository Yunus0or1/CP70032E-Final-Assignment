let { movieTheaterData, adminData } = require('../../assets/movie_datastructure.js');
let docClient = require('./aws_dynamo_conn');
const bcrypt = require('bcryptjs');

async function scanAndDelete() {
  const params = {
    TableName: 'movie',
  };

  const scanResults = [];
  let items;

  try {
    do {
      items = await docClient.scan(params).promise();
      items.Items.forEach((item) => scanResults.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    for (let data of scanResults) {
      var currentItem = {
        TableName: 'movie',
        Key: {
          id: data.id,
          createdTime: data.createdTime
        },

      };

      items = await docClient.delete(currentItem).promise();
    }
  } catch (err) {
    console.log(err)
    return false
  }

  return true

};

async function insertTheaterData() {
  for (const [key, movieTheater] of Object.entries(movieTheaterData)) {

    let id = movieTheater.id
    let title = movieTheater.title
    let identifierTitle = movieTheater.identifierTitle
    let metaData = {
      location: movieTheater.location
    }
    let seats = movieTheater.seats
    let dataType = "MovieTheater"
    let totalSeats = movieTheater.totalSeats

    var params = {
      TableName: 'movie',
      Item: {
        "id": id,
        "createdTime": randomIntFromInterval(1, 100000),
        "dataType": dataType,
        "title": title,
        "identifierTitle": identifierTitle,
        "metaData": metaData,
        "seats": seats,
        "totalSeats": totalSeats
      }
    };

    try {
      await docClient.put(params).promise();
    } catch (err) {
      console.log(err.name + ':' + err.message,)
      console.log('File/Method: db_conn/insertTheaterData()')
      return false
    }
  }

  return true

}

async function insertAdminData() {
  for (const [key, admin] of Object.entries(adminData)) {

    let id = admin.id
    let firstName = admin.firstName
    let lastName = admin.lastName
    let email = admin.email
    let password = await hashPassword(admin.password)
    let userType = admin.userType
    let dataType = "User"

    var params = {
      TableName: 'movie',
      Item: {
        "id": id,
        "createdTime": randomIntFromInterval(1, 100000),
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "userType": userType,
        "dataType": dataType,
      }
    };

    try {
      await docClient.put(params).promise();
    } catch (err) {
      console.log(err.name + ':' + err.message,)
      console.log('File/Method: db_conn/insertAdminData()')
      return false
    }
  }

  return true

}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function hashPassword(plainPassword) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash
}

module.exports = {
  scanAndDelete,
  insertTheaterData,
  insertAdminData
};