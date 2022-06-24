import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "../modules/components/Typography";
import Button from "../modules/components/Button";
import { EventDetails } from "../modules/components/EventDetails";
import Snackbar from "../modules/components/Snackbar";
import { SeatButton } from "../modules/components/SeatButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";
import BookingsService from "../services/bookings/index";

// state
import { useSelector, useDispatch } from "react-redux";
import { removeSeat, selectSeats, clear } from "../state/bookSlice";

// theatres
import { Theatre1 } from "../modules/venue/Theatre1";
import { Theatre2 } from "../modules/venue/Theatre2";
import { Theatre3 } from "../modules/venue/Theatre3";

export const BookEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const event = state?.event;
  const keep = state?.keep;
  const selectedSeats = useSelector(selectSeats);

  const [initialLoading, setInitialLoading] = useState(true);

  // server response loading & error open/setOpen for snackbar
  const [content, setContent] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // if there is no event passed into this page, then return into events list
    if (!event) navigate("/events-list");
    finalise();
  }, []);

  const finalise = async () => {
    if (!keep) dispatch(clear());
    await new Promise((resolve) => setTimeout(resolve, 600));
    setInitialLoading(false);
  };

  const handleCheckout = async () => {
    setChecking(true);

    const res = await BookingsService.checkSeats({
      eventId: event.id,
      createdTime: event.createdTime,
      bookedSeat: selectedSeats,
    });

    if (res.status) {
      navigate("/checkout", { state: { event } });
    } else {
      setChecking(false);
      // put inside snackbar the server message
      setContent(res.responseMessage);
      setOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setOpen(false);
    }
  };

  const getVenue = () => {
    switch (event.venue.identifierTitle) {
      case "theater1":
        return <Theatre1 seats={event.venue.seats} />;
      case "theater2":
        return <Theatre2 seats={event.venue.seats} />;
      case "theater3":
        return <Theatre3 seats={event.venue.seats} />;
      default:
        return <h1>Something went wrong.</h1>;
    }
  };

  return initialLoading ? (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Snackbar
        open={open}
        closeFunc={() => setOpen(false)}
        message={content}
      />
      <div style={{ display: "flex" }}>
        <div style={{ width: "25vw", minHeight: "100%" }}>
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontSize: 28,
                  borderBottom: "1px dashed black",
                  mb: 2,
                  pb: 1,
                }}
              >
                Book Event
              </Typography>
              <EventDetails
                name={event.movieName}
                dateTime={event.eventTime}
                duration={event.eventDuration}
                venueTitle={event.venue.title}
                venueLocation={event.venue.location}
              />
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "50vh",
                  gap: 1,
                  overflow: "scroll",
                }}
              >
                {selectedSeats.length === 0 ? (
                  <Typography
                    sx={{
                      ml: -1,
                      mr: -1,
                      fontSize: 14,
                      fontStyle: "italic",
                    }}
                  >
                    Begin by pressing onto one of the seats on the right.
                  </Typography>
                ) : (
                  selectedSeats.map((seat) => {
                    return (
                      <SeatButton
                        seat={seat}
                        price={event.price}
                        onClick={() => {
                          dispatch(
                            removeSeat({
                              rowKey: seat.rowKey,
                              index: seat.index,
                            })
                          );
                        }}
                      />
                    );
                  })
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 1,
              }}
            >
              <Box>
                <Typography variant="subtitle2">
                  {selectedSeats.length} × £{event.eventPrice.toFixed(2)}
                </Typography>
                <Typography variant="subtitle2">
                  Total: £{(selectedSeats.length * event.eventPrice).toFixed(2)}
                </Typography>
              </Box>
              <Button
                color="secondary"
                variant="contained"
                component="a"
                disabled={selectedSeats.length === 0 || checking}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </div>
        {getVenue()}
      </div>
    </>
  );
};
