import {
  Box,
  Typography,
  Modal,
  Button,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import BookingsService from "../../services/bookings/index";

// state
import { useSelector } from "react-redux";
import { selectEvent, selectSeatList } from "../../state/bookClientSlice";

// venues
import { Theatre1 } from "../../components/venue/Theatre1";
import { Theatre2 } from "../../components/venue/Theatre2";
import { Theatre3 } from "../../components/venue/Theatre3";

export const SeatDetails = () => {
  const selectedEvent = useSelector(selectEvent);
  const selectedSeatList = useSelector(selectSeatList);
  const empty = selectedSeatList.length == 0;

  // seating plan - button disabled when initiation availablity check
  const [loading, setLoading] = useState(false);

  // modal (seating plan)
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // snackbar (check availability)
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [snackbarContent, setSnackbarContent] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const checkAvailability = async () => {
    setLoading(true);

    console.log(selectedEvent.id);
    console.log(selectedEvent.createdTime);
    console.log(selectedSeatList);

    // make server request
    const res = await BookingsService.checkSeats({
      serverEventId: selectedEvent.id,
      serverCreatedTime: selectedEvent.createdTime,
      seats: selectedSeatList,
    });

    console.log(res);

    // load up the snackbar with relevant content and then display
    setSnackbarSeverity(res.status ? "success" : "error");
    if (res.status) {
      setSnackbarContent("Selected seats available.");
    } else {
      setSnackbarContent(res.responseMessage);
    }
    setSnackbarOpen(true);
    setLoading(false);

    // wait few seconds to close
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSnackbarOpen(false);
  };

  const getVenue = () => {
    console.log(selectedEvent.venue.identifierTitle);
    switch (selectedEvent.venue.identifierTitle) {
      case "theater1":
        return <Theatre1 seats={selectedEvent.venue.seats} />;
      case "theater2":
        return <Theatre2 seats={selectedEvent.venue.seats} />;
      case "theater3":
        return <Theatre3 seats={selectedEvent.venue.seats} />;
      default:
        return <h1>Something went wrong.</h1>;
    }
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarContent}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Selected Seats</Typography>
        <Button
          sx={{ height: "100%" }}
          variant="outlined"
          onClick={handleModalOpen}
        >
          {empty ? "Add" : "Change"}
        </Button>
      </Box>
      <Box sx={{ pt: 2, pb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {selectedSeatList.map((seat) => (
          <Chip label={seat.rowKey + "" + (seat.index + 1)} />
        ))}
      </Box>
      <Typography gutterBottom>
        Seat Subtotal: £
        {(selectedSeatList.length * selectedEvent.eventPrice).toFixed(2)}
      </Typography>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "4px",
          }}
        >
          <Box sx={{ p: 10, pt: 20 }}>{getVenue()}</Box>
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={checkAvailability}
              disabled={selectedSeatList.length == 0 || loading}
            >
              Check Availability
            </Button>
            <Button variant="contained" onClick={handleModalClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
