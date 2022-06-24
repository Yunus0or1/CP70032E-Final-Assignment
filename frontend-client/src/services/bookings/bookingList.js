import api from "../api";

export async function bookingList() {
  const dataRequest = {
    routeKey: "GET_BOOKING_LIST",
  };

  return api({ method: "post", data: dataRequest });
}
