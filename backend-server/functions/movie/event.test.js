const { setEvent, getEventList, getTheaterList, deleteEvent } = require('./event');
const { movieTheaterData } = require('../../assets/movie_datastructure');

test("SET EVENT", async () => {

  const requestBody = {
    "eventName": 'Event 1',
    "movieName": 'Spider Man 1',
    "eventTime": '2022-05-28T12:57:00.000Z',
    "eventDuration": '60',
    "eventPrice": 80,
    "venueList": [movieTheaterData.theater1]
  }

  const setEventResponse = await setEvent(requestBody);
  expect(setEventResponse).toBeTruthy();
});


test("UPDATE EVENT", async () => {

  const requestBody = {
    "eventId": "EVENT_cd01fca2_2b2b_474f_a0fd_64c4ef9b9810",
    "createdTime": 1654434376201,
    "eventName": 'Event Change 1',
    "movieName": 'Spider Man 2',
    "eventTime": '2022-05-29T12:57:00.000Z',
    "eventDuration": '60',
    "eventPrice": 80,
    "venueList": [movieTheaterData.theater1]
  }

  const setEventResponse = await setEvent(requestBody);
  expect(setEventResponse).toBeTruthy();
});

test("GET EVENT LIST", async () => {
  const getEventResponse = await getEventList();
  expect(getEventResponse).toBeTruthy();
});

test("DELETE EVENT", async () => {
  const requestBody = {
    "eventId": "EVENT_dc83fdff_7ed1_418d_9347_30817845695a",
    "createdTime": 1654441305599,
  }
  const deleteEventResponse = await deleteEvent(requestBody);
  expect(deleteEventResponse).toBeTruthy();
});

test("GET THEATER LIST", async () => {
  const getTheaterListResponse = await getTheaterList();
  expect(getTheaterListResponse).toBeTruthy();
});
