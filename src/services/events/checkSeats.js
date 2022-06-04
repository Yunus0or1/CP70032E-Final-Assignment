import api from "../api";

export async function checkSeats({ serverEventId, serverCreatedTime, seats }) {
  const dataRequest = {
    routeKey: "CHECK_SEAT_PLAN",
    eventId: serverEventId,
    createdTime: serverCreatedTime,
    bookedSeat: seats,
  };

  console.log(dataRequest);

  return api({ method: "post", data: dataRequest });
}
