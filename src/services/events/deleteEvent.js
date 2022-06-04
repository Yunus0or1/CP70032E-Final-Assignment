import api from "../api";

export async function deleteEvent({ serverEventId, serverCreatedTime }) {
  const dataRequest = {
    routeKey: "DELETE_EVENT",
    eventId: serverEventId,
    createdTime: serverCreatedTime,
  };

  console.log(dataRequest);

  return api({ method: "post", data: dataRequest });
}
