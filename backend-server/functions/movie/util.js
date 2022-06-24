let docClient = require("./aws_dynamo_conn");
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

function randomId() { // min and max included 
  const min = 1
  const max = 99999999
  const id = Math.floor(Math.random() * (max - min + 1) + min)
  return id.toString()
}

function currentDate() {
  return Date.now()
}

async function hashPassword(plainPassword) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash
}


async function matchPassword(plainPassword, hash) {
  return await bcrypt.compare(plainPassword, hash);;
}


async function createBigId(prefix) {
  return prefix + '_' + uuidv4().toString().replace(/-/g, '_')
};


module.exports = {
  randomId,
  currentDate,
  hashPassword,
  matchPassword,
  createBigId
};
