import api from "../api";

export async function bookingsList() {
  const dataRequest = {
    routeKey: "GET_BOOKING_LIST",
  };

  console.log(dataRequest);

  return api({ method: "post", data: dataRequest });
}
