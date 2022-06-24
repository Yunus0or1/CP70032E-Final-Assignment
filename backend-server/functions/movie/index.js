const { userLogin, userRegister } = require("./user_auth.js");
const { setEvent, getEventList, getTheaterList, deleteEvent } = require("./event.js");
const { checkSeatBooking, getBookingList, setBooking } = require("./booking.js");

const routeFunction = {
  "USER_LOGIN": userLogin,
  "USER_REGISTER": userRegister,
  "SET_EVENT": setEvent,
  "GET_EVENT_LIST": getEventList,
  "GET_THEATER_LIST": getTheaterList,
  "CHECK_SEAT_PLAN": checkSeatBooking,
  "SET_BOOKING": setBooking,
  "GET_BOOKING_LIST": getBookingList,
  "DELETE_EVENT": deleteEvent,
}

exports.handler = async (event) => {
  try {
    console.log('Lambda Handler for Movie App')

    const body = JSON.parse(event.body)

    const { routeKey } = body

    const data = await routeFunction[routeKey](body)

    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 200,
      body: error.name + ":" + error.message,
    };
    return response;
  }
};
