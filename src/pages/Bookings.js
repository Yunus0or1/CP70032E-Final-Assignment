import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  TextField,
  Paper,
  Divider,
  Button,
  CircularProgress,
  Chip,
  Popover,
} from "@mui/material";
import BookingsService from "../services/bookings";

export const Bookings = () => {
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState("");
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    setInitial(false);
    setLoading(true);

    console.warn(ref);
    console.warn(name);

    const res = await BookingsService.bookingsList();
    console.log(res);

    if (!res.status) {
      // alerting user about error and then returning early
      alert(res.responseMessage);
      return;
    }

    const all = res.bookingList;

    // figuring out if we are searching for ref and/or name
    const refSearch = ref.trim().length !== 0;
    const nameSearch = name.trim().length !== 0;

    const found = all.filter((booking) => {
      // figuring out if there are matches
      const refMatch = refSearch
        ? ref.trim().toLowerCase() === booking.id.slice(-6).toLowerCase()
        : false;
      const nameMatch = nameSearch
        ? name.trim().toLowerCase() === booking.customerName?.toLowerCase()
        : false;

      // searching for reference and name
      if (refSearch && nameSearch) return refMatch && nameMatch;
      // searching for reference only
      if (refSearch) return refMatch;
      // searching for name only
      if (nameSearch) return nameMatch;

      return false;
    });

    // sorting by date, and then only showing bookings for upcoming events
    function compare(a, b) {
      if (new Date(a.eventTime) > new Date(b.eventTime)) return 1;
      if (new Date(a.eventTime) < new Date(b.eventTime)) return -1;
      return 0;
    }
    found.sort(compare);
    const finalFound = found.filter(
      (booking) => new Date(booking.eventTime) > new Date()
    );

    setResults(finalFound);
    setLoading(false);
  };

  const handleAction = async (booking, newStatus) => {
    setLoading(true);

    const res = await BookingsService.bookClient({
      eventId: booking.eventId,
      bookingId: booking.id,
      createdTime: booking.createdTime,
      bookingStatus: newStatus,
      totalCost: booking.totalCost,
      customerName: booking.customerName,
      snacksList: booking.snacksList,
      seatList: booking.seatList,
    });
    if (res.status) {
      handleSearch();
    } else {
      alert(res.responseMessage);
    }
  };

  return (
    <Container maxWidth="md" sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="h4">Bookings</Typography>
          <Typography>
            Search by reference or name for results, most recent first.
          </Typography>
        </Box>
        <Paper
          variant="outlined"
          sx={{ width: "100%", p: 2, display: "flex", gap: 2 }}
        >
          <TextField
            label="Reference Number"
            sx={{ width: "100%" }}
            value={ref}
            onChange={(e) => setRef(e.target.value)}
          />
          <TextField
            label="Customer Name"
            sx={{ width: "100%" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ width: "200px" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Paper>

        {loading || results.length == 0 ? (
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography>
                {initial ? (
                  <i>
                    Start searching by inputting the reference number
                    (preferred) or the customer name.
                  </i>
                ) : (
                  <p align="center">
                    <b>204 (No Content)</b> <br />
                    No results found with that query.
                  </p>
                )}
              </Typography>
            )}
          </Box>
        ) : (
          results.map((result) => {
            return (
              <Paper
                variant="outlined"
                sx={{
                  p: 4,
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box>
                    <Typography variant="h5">
                      Name: {result.customerName}
                    </Typography>
                    <Typography>
                      Total Cost: £{result.totalCost.toFixed(2)}
                    </Typography>
                    <Typography>
                      Type:{" "}
                      {result.customerId
                        ? "Online Booking"
                        : "Phone/Counter Booking"}
                    </Typography>
                    <Typography>Status: {result.bookingStatus}</Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="h5">{result.movieName}</Typography>
                    <Typography>{result.eventDuration} minutes</Typography>
                    <Typography>
                      {result.venue.title}, {result.venue.location}
                    </Typography>
                    <Typography>
                      {new Date(result.eventTime).toString()}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {result.seatList.map(({ rowKey, index }) => {
                      return <Chip label={rowKey + "" + (index + 1)} />;
                    })}
                  </Box>
                  <Divider />
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {Object.values(result.snacksList).map((snack) => (
                      <Chip label={snack.quantity + " × " + snack.label} />
                    ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Button
                    disabled={!(result.bookingStatus == "UNPAID")}
                    variant="contained"
                    color="success"
                    onClick={() => handleAction(result, "CONFIRMED")}
                  >
                    Confirm
                  </Button>

                  <Button
                    disabled={result.bookingStatus == "CANCELLED"}
                    variant="contained"
                    color="error"
                    onClick={() => handleAction(result, "CANCELLED")}
                  >
                    Cancel
                  </Button>
                </Box>
              </Paper>
            );
          })
        )}
      </Box>
    </Container>
  );
};
