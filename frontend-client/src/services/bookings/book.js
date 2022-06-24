import api from "../api";

export async function book({
  eventId,
  bookingId = null,
  createdTime,
  bookingStatus,
  totalCost,
  customerName,
  customerId,
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
    customerId,
    snacksList,
    seatList,
  };

  return api({ method: "post", data: dataRequest });
}
