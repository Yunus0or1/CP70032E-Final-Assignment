import api from "../api";

export async function checkSeats({eventId, createdTime, bookedSeat}) {
  const dataRequest = {
    routeKey: "CHECK_SEAT_PLAN",
    eventId: eventId,
    createdTime: createdTime,
    bookedSeat: bookedSeat,
  };

  return api({ method: "post", data: dataRequest });
}
