import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Snackbar from "../modules/components/Snackbar";
import Button from "../modules/components/Button";
import AppForm from "../modules/views/AppForm";
import { SeatButton } from "../modules/components/SeatButton";
import { required } from "../modules/form/validation";
import { Field, Form, FormSpy } from "react-final-form";
import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";
import FormFeedback from "../modules/form/FormFeedback";
import BookingsService from "../services/bookings/index";

// state
import { useSelector } from "react-redux";
import {
  selectSeats,
  selectSnacks,
  selectSnacksSubtotal,
} from "../state/bookSlice";
import { selectUser } from "../state/authSlice";
import Typography from "../modules/components/Typography";
import { EventDetails } from "../modules/components/EventDetails";
import { SnacksSelection } from "../modules/components/SnacksSelection";

export const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state?.event;

  const user = useSelector(selectUser);
  const selectedSeats = useSelector(selectSeats);
  const selectedSnacks = useSelector(selectSnacks);
  const snacksSubtotal = useSelector(selectSnacksSubtotal);

  // server response error open/setOpen for snackbar
  const [content, setContent] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [sent, setSent] = React.useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    // if no seats are selected, or if no event is passed, go back to events list
    if (selectedSeats.length === 0 || !event) navigate("/events-list");
  }, []);

  const handleAmend = () =>
    navigate("/book-event", { state: { event: event, keep: true } });

  const validate = (values) => {
    const errors = required(
      ["cardNumber", "validUntil", "cvv", "cardHolder"],
      values
    );

    return errors;
  };

  const getSeatSubtotal = () => selectedSeats.length * event.eventPrice;
  const getTotal = () => getSeatSubtotal() + snacksSubtotal;

  const handleSubmit = async (values) => {
    setSent(true);

    const res = await BookingsService.book({
      eventId: event.id,
      createdTime: event.createdTime,
      bookingStatus: "CONFIRMED",
      totalCost: getTotal(),
      customerName: user.firstName + " " + user.lastName,
      customerId: user.id,
      snacksList: selectedSnacks,
      seatList: selectedSeats,
    });

    if (res.status) {
      setBookingId(res.bookingId);
      setBooked(true);
      setSent(false);
    } else {
      // put inside snackbar the server message
      setContent(res.responseMessage);
      setOpen(true);
      setSent(false);
    }
  };

  return (
    <>
      <AppForm size={"lg"}>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Checkout
        </Typography>

        <Box sx={{ display: "flex", gap: 10, justifyContent: "space-evenly", alignItems: "start" }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1.8 }}
          >
            <EventDetails
              name={event.movieName}
              dateTime={event.eventTime}
              duration={event.eventDuration}
              venueTitle={event.venue.title}
              venueLocation={event.venue.location}
            />
            {selectedSeats.map((seat) => (
              <Box sx={{ minWidth: 300 }}>
                <SeatButton
                  seat={seat}
                  price={event.price}
                  buttonLabel={booked ? "Booked" : "Amend"}
                  onClick={handleAmend}
                  disabled={sent || booked}
                />
              </Box>
            ))}
            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: 18 }}>
              Seat Subtotal: £{getSeatSubtotal().toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1.8 }}
          >
            <SnacksSelection disabled={sent || booked} />
          </Box>

          {booked ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                gap: 2,
              }}
            >
              <Typography variant="h5">Booking Successful</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle2">Reference Number: </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: 23, ml: 1, borderBottom: "2px solid black" }}
                >
                  {bookingId.slice(-6)}
                </Typography>
              </Box>
              <Typography>
                You are ready to go! You will need to give us your reference
                number when you attend your event. Feel free to check and refer
                your booking in your account page under your orders.
              </Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={() => navigate("/account")}
                sx={{ mt: 4 }}
              >
                Account
              </Button>
            </Box>
          ) : (
            <Form
              onSubmit={handleSubmit}
              subscription={{ submitting: true }}
              validate={validate}
            >
              {({ handleSubmit: handleSubmit2, submitting }) => (
                <Box component="form" onSubmit={handleSubmit2} noValidate>
                  <Typography variant="subtitle2" sx={{ fontSize: 18, mt: 2 }}>
                    Payment
                  </Typography>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    label="Card Number"
                    margin="normal"
                    name="cardNumber"
                    required
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={RFTextField}
                        disabled={submitting || sent}
                        fullWidth
                        label="Valid until"
                        name="validUntil"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={RFTextField}
                        disabled={submitting || sent}
                        fullWidth
                        label="CVV"
                        name="cvv"
                        required
                      />
                    </Grid>
                  </Grid>

                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    label="Card Holder"
                    margin="normal"
                    name="cardHolder"
                  />
                  <FormSpy subscription={{ submitError: true }}>
                    {({ submitError }) =>
                      submitError ? (
                        <FormFeedback error sx={{ mt: 2 }}>
                          {submitError}
                        </FormFeedback>
                      ) : null
                    }
                  </FormSpy>
                  <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    disabled={submitting || sent}
                    color="secondary"
                    fullWidth
                  >
                    {submitting || sent
                      ? "In progress…"
                      : "Purchase – £" + getTotal().toFixed(2)}
                  </FormButton>
                </Box>
              )}
            </Form>
          )}
        </Box>
        <Snackbar
          open={open}
          closeFunc={() => setOpen(false)}
          message={content}
        />
      </AppForm>
    </>
  );
};
