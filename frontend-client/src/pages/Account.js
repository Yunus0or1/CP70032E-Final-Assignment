import React, { useEffect, useState } from "react";
import AppForm from "../modules/views/AppForm";
import Typography from "../modules/components/Typography";
import Button from "../modules/components/Button";
import { EventDetails } from "../modules/components/EventDetails";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import BookingsService from "../services/bookings/index";
import { useSelector } from "react-redux";
import { selectUser } from "../state/authSlice";

export const Account = () => {
  const user = useSelector(selectUser);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    const res = await BookingsService.bookingList();

    const matchingBookings = res.bookingList.filter((booking) => {
      return booking.customerId == user.id;
    });

    console.warn(matchingBookings);

    // sorting upcoming events by date
    function compare(a, b) {
      if (new Date(a.eventTime) < new Date(b.eventTime)) return 1;
      if (new Date(a.eventTime) > new Date(b.eventTime)) return -1;
      return 0;
    }
    matchingBookings.sort(compare);

    if (res.status) {
      // loading data from the server into the data hook variable
      setData(matchingBookings);
      setLoading(false);
    } else {
      alert(res.responseMessage);
    }
  };

  const handleCancel = async (booking) => {
    setLoading(true);

    console.log(booking);

    const res = await BookingsService.book({
      bookingId: booking.id,
      eventId: booking.eventId,
      createdTime: booking.createdTime,
      bookingStatus: "CANCELLED",
      totalCost: booking.totalCost,
      customerName: booking.customerName,
      customerId: booking.customerId,
      snacksList: booking.snacksList,
      seatList: booking.seatList,
    });

    console.log(res);

    if (res.status) {
      // after good response from the server, refresh the data
      handleFetchData();
    } else {
      alert(res.responseMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "70vh" }}>
        <AppForm size="md">
          <Typography
            variant="h3"
            gutterBottom
            marked="center"
            align="center"
            sx={{ mb: 6 }}
          >
            Account
          </Typography>
          <Typography
            variant="h4"
            // gutterBottom
            marked="center"
            align="center"
            sx={{ mb: 1 }}
          >
            Bookings
          </Typography>
          <Typography
            // variant="h4"
            gutterBottom
            // marked="center"
            align="center"
            sx={{ mb: 4 }}
          >
            Your orders in descending order according to event date.
          </Typography>
          {loading ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {data.map((booking) => {
                const minusOne = new Date(booking.eventTime);
                minusOne.setDate(minusOne.getDate() - 1);

                const cannotCancel = minusOne < new Date();

                return (
                  <Box
                    key={booking.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px dotted black",
                      p: 2,
                    }}
                  >
                    <Box>
                      <EventDetails
                        name={booking.movieName}
                        dateTime={booking.eventTime}
                        duration={booking.eventDuration}
                        venueTitle={booking.venue.title}
                        venueLocation={booking.venue.location}
                      />
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {booking.seatList.map((seat) => {
                          return (
                            <Box
                              sx={{
                                fontWeight: "bold",
                                background: "black",
                                color: "white",
                                pt: 0.3,
                                pl: 0.7,
                                pr: 0.7,
                                borderRadius: "2px",
                              }}
                            >
                              {seat.rowKey}
                              {seat.index}
                            </Box>
                          );
                        })}
                      </Box>
                      <Box sx={{ display: "flex", gap: 2, mt: 1, mb: 0.3 }}>
                        {Object.values(booking.snacksList).map((snack) => {
                          const q = snack.quantity;
                          return q > 0 ? (
                            <Typography>
                              {q} × {snack.label}
                            </Typography>
                          ) : null;
                        })}
                      </Box>
                      <Box sx={{ display: "flex", gap: 0.5, mb: -1.2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Reference Number:{" "}
                          <span style={{ fontFamily: "monospace" }}>
                            {booking.id.slice(-6)}
                          </span>
                        </Typography>
                        ｜
                        <Typography variant="subtitle2" gutterBottom>
                          Total: £{booking.totalCost.toFixed(2)}
                        </Typography>
                        {booking.bookingStatus == "CANCELLED" ? (
                          <>
                            {" "}
                            ｜
                            <Typography
                              variant="subtitle2"
                              gutterBottom
                              sx={{ color: "red" }}
                            >
                              Booking Cancelled
                            </Typography>
                          </>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleCancel(booking)}
                        size="small"
                        disabled={
                          cannotCancel || booking.bookingStatus == "CANCELLED"
                        }
                      >
                        Cancel
                      </Button>
                      {booking.bookingStatus == "CANCELLED" ? (
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: 10, textAlign: "center", mt: 1 }}
                        >
                          Booking has
                          <br />
                          been cancelled.
                        </Typography>
                      ) : cannotCancel ? (
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: 10, textAlign: "center", mt: 1 }}
                        >
                          Cannot cancel less
                          <br />
                          than 24 hours
                          <br />
                          before viewing.
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </AppForm>
      </Box>
    </>
  );
};
