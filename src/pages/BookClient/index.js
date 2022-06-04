import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useLocation } from "react-router-dom";
import { Loading } from "../../components/Loading";
import BookingsService from "../../services/bookings/index";
import { useNavigate } from "react-router-dom";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  clearAndSetEvent,
  selectSnacksSubtotal,
  selectAll,
} from "../../state/bookClientSlice";

// steps
import { EventDetails } from "./EventDetails";
import { SeatDetails } from "./SeatDetails";
import { SnackDetails } from "./SnackDetails";
import { Reservation } from "./Reservation";

const steps = ["Event", "Seats", "Snacks", "Reservation"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EventDetails />;
    case 1:
      return <SeatDetails />;
    case 2:
      return <SnackDetails />;
    case 3:
      return <Reservation />;
    default:
      throw new Error("Unknown step");
  }
}

export const BookClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const event = state?.event;

  const all = useSelector(selectAll);
  const snacksSubtotal = useSelector(selectSnacksSubtotal);

  const [loading, setLoading] = React.useState(true);

  // when initial booking is successful but not yet paid
  const [reserved, setReserved] = React.useState(false);
  // will be received after initial booking
  const [bookingId, setBookingId] = React.useState();
  // when the booking is paid for
  const [paid, setPaid] = React.useState(false);

  // required for if seats unavailable
  const [snackbarContent, setSnackbarContent] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    handleStateSet();
  }, []);

  const handleStateSet = async () => {
    dispatch(clearAndSetEvent(event));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) validate();
    else setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const validate = () => {
    if (all.bookClient.name.length === 0) {
      window.alert(
        "Name of the customer needs to have at least one character."
      );
      return;
    }

    if (all.bookClient.seatList.length === 0) {
      window.alert("There needs to be at least one seat booked.");
      return;
    }

    handleReservation();
  };

  const handleReservation = async () => {
    setLoading(true);

    const { name, event, seatList, snacksList } = all.bookClient;

    // make server request
    const checkRes = await BookingsService.checkSeats({
      serverEventId: event.id,
      serverCreatedTime: event.createdTime,
      seats: seatList,
    });
    if (!checkRes.status) {
      // load up snackbar and end progress indicator
      setSnackbarContent(checkRes.responseMessage);
      setSnackbarOpen(true);
      setLoading(false);
      // wait few seconds to close
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSnackbarOpen(false);
    } else {
      const total = snacksSubtotal + event.eventPrice * seatList.length;
      const res = await BookingsService.bookClient({
        eventId: event.id,
        // bookingId, // no bookingId since this is initial booking
        createdTime: event.createdTime,
        bookingStatus: "UNPAID",
        totalCost: total,
        customerName: name,
        snacksList: snacksList,
        seatList: seatList,
      });

      console.warn(res);

      if (res.status) {
        setLoading(false);
        setBookingId(res.bookingId);
        setReserved(true);
      } else {
        alert(res.responseMessage);
        setLoading(false);
      }
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    const { name, event, seatList, snacksList } = all.bookClient;
    const total = snacksSubtotal + event.eventPrice * seatList.length;
    const res = await BookingsService.bookClient({
      eventId: event.id,
      bookingId: bookingId, // initial booking was done so providing it to reference the initial booking
      createdTime: event.createdTime,
      bookingStatus: "CONFIRMED",
      totalCost: total,
      customerName: name,
      snacksList: snacksList,
      seatList: seatList,
    });

    console.warn(res);

    if (res.status) {
      setLoading(false);
      setPaid(true);
    } else {
      alert(res.responseMessage);
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarContent}
        </Alert>
      </Snackbar>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          mb: 4,
        }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Book Client
          </Typography>

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {!paid && !reserved ? (
            <React.Fragment>
              {getStepContent(activeStep)}

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Confirm Booking" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <></>
          )}

          {reserved && !paid ? (
            <>
              <Typography variant="h5">
                Booking Reserved <DoneIcon />
              </Typography>
              <Typography>
                The booking is reserved but not yet paid. Once the payment has
                been processed on PDQ, mark this booking has paid.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <Typography sx={{ fontSize: 16 }}>
                  Booking Reference:{" "}
                  <span
                    style={{
                      borderBottom: "2px solid black",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                    }}
                  >
                    {bookingId.slice(-6)}
                  </span>
                </Typography>
                <Button variant="contained" onClick={handlePayment}>
                  Mark as Paid
                </Button>
              </Box>
            </>
          ) : (
            <></>
          )}

          {reserved && paid ? (
            <>
              <Typography variant="h5" gutterBottom>
                Booking Paid <DoneAllIcon />
              </Typography>
              <Typography>
                Booking is fully complete. Inform the customer of the reserved &
                paid status, and that their name and other booking information
                will be required to attend the event.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <Typography sx={{ fontSize: 16 }}>
                  Booking Reference:{" "}
                  <span
                    style={{
                      borderBottom: "2px solid black",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                    }}
                  >
                    {bookingId.slice(-6)}
                  </span>
                </Typography>
                <Button variant="contained" onClick={() => navigate("/events")}>
                  Events
                </Button>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Paper>
      </Container>
    </>
  );
};
