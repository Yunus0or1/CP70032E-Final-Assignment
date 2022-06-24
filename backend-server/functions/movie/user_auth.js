let docClient = require("./aws_dynamo_conn");
const { randomId, currentDate, hashPassword, matchPassword, createBigId } = require('./util.js');
const { ServerEnum, AccessPattern } = require("./EnumData");

async function userLogin(requestBody) {
  const { email, password } = requestBody

  var params = {
    TableName: "movie",
    FilterExpression: '#email = :email',
    ExpressionAttributeNames: {
      '#email': 'email',
    },
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  try {
    const userDataFetch = await docClient.scan(params).promise();
    const rawData = userDataFetch.Items;

    if (rawData.length > 0) {
      const dbPassword = rawData[0].password

      const passwordMatched = await matchPassword(password, dbPassword)

      if (passwordMatched) {
        const user = rawData[0]
        user.password = null
        return {
          user,
          status: true,
          responseMessage: ServerEnum.RESPONSE_SUCCESS
        }
      }

      return {
        status: false,
        responseMessage: ServerEnum.RESPONSE_USER_NOT_FOUND
      }
    }

    return {
      status: false,
      responseMessage: ServerEnum.RESPONSE_USER_NOT_FOUND
    }
  } catch (error) {
    console.log(error.name + ":" + error.message);
    console.log("File/Method: user_auth/userAuth()");
    return {
      status: false,
      responseMessage: ServerEnum.RESPONSE_CONNECTION_ERROR
    }
  }
}

async function userRegister(requestBody) {
  const { email, password, firstName, lastName, } = requestBody

  var params = {
    TableName: "movie",
    FilterExpression: '#email = :email',
    ExpressionAttributeNames: {
      '#email': 'email',
    },
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  try {
    const userDataFetch = await docClient.scan(params).promise();
    const rawData = userDataFetch.Items;

    // Means Already there is an email registered to this
    if (rawData.length > 0) {
      return {
        status: false,
        responseMessage: ServerEnum.RESPONSE_ALREADY_REGISTERED
      }
    }

    // Now inserting
    const dataType = AccessPattern.User
    const userId = await createBigId('USER')

    var params = {
      TableName: 'movie',
      Item: {
        "id": userId,
        "createdTime": currentDate(),
        "dataType": dataType,
        "email": email,
        "password": await hashPassword(password),
        "firstName": firstName,
        "lastName": lastName,
        "userType": 'Customer'
      }
    };

    await docClient.put(params).promise();

    return {
      status: true,
      responseMessage: ServerEnum.RESPONSE_SUCCESS
    }
  } catch (error) {
    console.log(error.name + ":" + error.message);
    console.log("File/Method: user_auth/userRegister()");
    return {
      status: false,
      responseMessage: ServerEnum.RESPONSE_CONNECTION_ERROR
    }
  }
}

module.exports = { userLogin, userRegister };
