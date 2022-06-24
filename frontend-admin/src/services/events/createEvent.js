import api from "../api";

export async function createEvent({ name, dateTime, duration, venues, price }) {
  const dataRequest = {
    routeKey: "SET_EVENT",
    eventId: null,
    createdTime: null,
    eventName: name + " @ " + dateTime,
    movieName: name,
    eventTime: dateTime,
    eventDuration: duration,
    venueList: venues,
    eventPrice: price,
  };

  console.log(dataRequest);

  return api({ method: "post", data: dataRequest });
}
