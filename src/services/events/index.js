import { eventsList } from "./eventsList";
import { editEvent } from "./editEvent";
import { createEvent } from "./createEvent";
import { deleteEvent } from "./deleteEvent";
import { checkSeats } from "./checkSeats";
import { bookClient } from "./bookClient";

const EventsService = {
  eventsList: eventsList,
  editEvent: editEvent,
  createEvent: createEvent,
  deleteEvent: deleteEvent,
  checkSeats: checkSeats,
  bookClient: bookClient,
};

Object.freeze(EventsService);
export default EventsService;
