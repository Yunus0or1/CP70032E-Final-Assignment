import { eventsList } from "./eventsList";
import { editEvent } from "./editEvent";
import { createEvent } from "./createEvent";
import { deleteEvent } from "./deleteEvent";

const EventsService = {
  eventsList: eventsList,
  editEvent: editEvent,
  createEvent: createEvent,
  deleteEvent: deleteEvent,
};

Object.freeze(EventsService);
export default EventsService;
