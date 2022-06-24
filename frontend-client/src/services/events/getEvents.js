import api from "../api";

export async function getEvents() {
  const dataRequest = {
    routeKey: "GET_EVENT_LIST",
  };

  return api({ method: "post", data: dataRequest });
}
