const { insertTheaterData, insertAdminData, scanAndDelete } = require('./db_data_insert');

test("DELETE PREV DATA", async () => {
  const scanData = await scanAndDelete()
  expect(scanData).toBe(true);
});


test("INSERT DB MOVIE DATA", async () => {
  const insertTheaterTest = await insertTheaterData();
  expect(insertTheaterTest).toBe(true);

});

test("INSERT DB ADMIN DATA", async () => {
  const insertTheaterTest = await insertAdminData();
  expect(insertTheaterTest).toBe(true);
});