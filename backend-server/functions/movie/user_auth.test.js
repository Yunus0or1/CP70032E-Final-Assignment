const { userLogin, userRegister } = require('./user_auth.js');

test("LOGIN USER DATA", async () => {

  const data = {
    email: 'admin@admin.com',
    password: '123123',
  }

  const userDataFetch = await userLogin(data);

  expect(userDataFetch).toHaveProperty("status");
  expect(userDataFetch).toHaveProperty("responseMessage");

});

test("REGISTER USER DATA", async () => {

  const data = {
    email: 'myemail@gmail.com',
    password: '123123',
    name: 'Admin2'
  }

  const userRegisterFetch = await userRegister(data);

  expect(userRegisterFetch).toHaveProperty("status");
  expect(userRegisterFetch).toHaveProperty("responseMessage");

});

