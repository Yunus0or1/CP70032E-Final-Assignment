import { bookingsList } from "./bookingsList";
import { bookClient } from "./bookClient";
import { checkSeats } from "./checkSeats";

const BookingsService = {
  bookingsList: bookingsList,
  bookClient: bookClient,
  checkSeats: checkSeats,
};

Object.freeze(BookingsService);
export default BookingsService;
