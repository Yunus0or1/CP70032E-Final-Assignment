const checkDBConn = require('./db_conn');

test("CHECK DB CONN", async () => {
    
  const dbConnCheck = await checkDBConn();
  expect(dbConnCheck).toBe(true);

});