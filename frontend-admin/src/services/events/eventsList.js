import api from "../api";

export async function eventsList() {
  const dataRequest = {
    routeKey: "GET_EVENT_LIST",
  };

  return api({ method: "post", data: dataRequest });
}
