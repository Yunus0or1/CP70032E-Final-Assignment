// bookings

import { checkSeats } from "./checkSeats";
import { book } from "./book";
import { bookingList } from "./bookingList";

const BookingsService = {
  checkSeats: checkSeats,
  book: book,
  bookingList: bookingList,
};

Object.freeze(BookingsService);
export default BookingsService;
