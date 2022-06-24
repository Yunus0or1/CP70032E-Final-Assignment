import api from "../api";

export async function editEvent({ updatedEvent }) {
  const dataRequest = Object.assign({}, updatedEvent, {
    routeKey: "SET_EVENT",
  });

  console.log(dataRequest);

  return api({ method: "post", data: dataRequest });
}
