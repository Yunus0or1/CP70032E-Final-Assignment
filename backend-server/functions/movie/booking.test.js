const { checkSeatBooking, setBooking, getBookingList } = require('./booking');
const { getEventList } = require('./event');

test("CHECK BOOKING SEAT", async () => {

  let bookedSeat = [
    {
      "rowKey": "G",
      "index": 1
    },
    {
      "rowKey": "H",
      "index": 2
    },
    {
      "rowKey": "H",
      "index": 3
    },
    {
      "rowKey": "G",
      "index": 3
    },
    {
      "rowKey": "G",
      "index": 2
    },
    {
      "rowKey": "H",
      "index": 8
    },
    {
      "rowKey": "H",
      "index": 10
    },
  ]

  const requestBody = {
    "eventId": "EVENT_cd01fca2_2b2b_474f_a0fd_64c4ef9b9810",
    "createdTime": 1654434376201,
    "bookedSeat": bookedSeat
  }

  const checkSeatBookingResponse = await checkSeatBooking(requestBody);
  expect(checkSeatBookingResponse).toBeTruthy();
});

test("SET TICKET BOOKING", async () => {
  let seatList = [
    {
      "rowKey": "G",
      "index": 1
    },
    {
      "rowKey": "H",
      "index": 2
    },
    {
      "rowKey": "H",
      "index": 3
    },
    {
      "rowKey": "G",
      "index": 3
    },
    {
      "rowKey": "G",
      "index": 2
    },
    {
      "rowKey": "H",
      "index": 8
    },
    {
      "rowKey": "H",
      "index": 10
    },
  ]

  const requestBody = {
    "eventId": "EVENT_cd01fca2_2b2b_474f_a0fd_64c4ef9b9810",
    "createdTime": 1654434376201,
    "bookingStatus": 'CONFIRMED',
    "customerId": '1',
    "customerName": 'GG',
    "totalCost": 80,
    "seatList": seatList,
    "snacksList": {},
  }

  const setBookingResponse = await setBooking(requestBody);
  expect(setBookingResponse).toBeTruthy();
});

test("UPDATE TICKET BOOKING", async () => {
  let seatList = [
    {
      "rowKey": "G",
      "index": 1
    },
    {
      "rowKey": "H",
      "index": 2
    },
    {
      "rowKey": "H",
      "index": 3
    },
    {
      "rowKey": "G",
      "index": 3
    },
    {
      "rowKey": "G",
      "index": 2
    },
    {
      "rowKey": "H",
      "index": 8
    },
    {
      "rowKey": "H",
      "index": 10
    },
  ]

  const requestBody = {
    bookingId: 'BOOKING_3188660e_4eaf_44d9_9350_168152467ca0',
    eventId: "EVENT_59a1436f_638f_4db6_8b7b_480c89d562ee",
    createdTime: 1653651896910,
    bookingStatus: 'CANCELLED',
    seatList: seatList,
    snacksList: {},
  }

  const setBookingResponse = await setBooking(requestBody);
  expect(setBookingResponse).toBeTruthy();
});

test("GET BOOKING LIST", async () => {
  const getBookingResponse = await getBookingList();
  expect(getBookingResponse).toBeTruthy();
});
