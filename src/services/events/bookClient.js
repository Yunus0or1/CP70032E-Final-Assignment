import api from "../api";

export async function bookClient({
  eventId,
  bookingId = null,
  createdTime,
  bookingStatus,
  totalCost,
  customerName,
  snacksList,
  seatList,
}) {
  const dataRequest = {
    routeKey: "SET_BOOKING",
    eventId,
    bookingId,
    createdTime,
    bookingStatus,
    totalCost,
    customerName,
    customerId: null,
    snacksList: snacksList,
    seatList: seatList,
  };

  console.log(dataRequest);

  return api({ method: "post", data: dataRequest });
}
