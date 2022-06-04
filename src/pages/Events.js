import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography, Paper, Box, Button, Popover } from "@mui/material";
import EventsService from "../services/events/index";
import { useNavigate } from "react-router-dom";

import { Loading } from "../components/Loading";
import { calculateAvailableSeats } from "../utility/calculateAvailableSeats";

export const Events = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    handleFetchData();
  }, []);

  // popover for confirming delete
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleFetchData = async () => {
    const res = await EventsService.eventsList();

    console.log(res);

    if (res.status) {
      // making the events sorted by date, most recent first
      let eventList = [...res.eventList];
      function compare(a, b) {
        if (new Date(a.eventTime) > new Date(b.eventTime)) return 1;
        if (new Date(a.eventTime) < new Date(b.eventTime)) return -1;
        return 0;
      }
      eventList.sort(compare);

      // only showing upcoming events instead of past events as well
      eventList = eventList.filter(
        (event) => new Date(event.eventTime) > new Date()
      );

      // loading data from the server into the data hook variable
      setData(eventList);
      setLoading(false);
    } else {
      alert(res.responseMessage);
    }
  };

  const handleDelete = async (event) => {
    setLoading(true);
    handleClose();

    await EventsService.deleteEvent({
      serverEventId: event.id,
      serverCreatedTime: event.createdTime,
    });

    handleFetchData();
  };

  return loading ? (
    <Loading />
  ) : (
    <Container maxWidth="md" sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4">Events</Typography>
          <Typography>Booked Upcoming Events, Most Recent First</Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate("/create-event")}
          sx={{ height: "100%" }}
        >
          Create
        </Button>
      </Box>
      {data.map((event) => {
        const dateTime = new Date(event.eventTime);

        const totalAvailable = calculateAvailableSeats(event.venue.seats);
        const booked = event.venue.totalSeats - totalAvailable;

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
            <Box>
              <Typography variant="h5">{event.movieName}</Typography>
              <Typography>{event.eventDuration} minutes</Typography>
              <Typography>
                {event.venue.location}, {event.venue.title}
              </Typography>
              <Typography>{dateTime.toString()}</Typography>
              <Typography>
                {totalAvailable} of {event.venue.totalSeats} Available, {booked}{" "}
                Booked
              </Typography>
              <LinearProgress
                sx={{ mt: 1 }}
                variant="determinate"
                value={(totalAvailable / event.venue.totalSeats) * 100}
              />
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
                variant="contained"
                color="secondary"
                onClick={() => navigate("/book-client", { state: { event } })}
              >
                Book
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/edit-event", { state: { event } })}
              >
                Edit
              </Button>
              <Button
                aria-describedby={id}
                variant="text"
                color="error"
                onClick={(e) => {
                  if (booked === 0) {
                    handleClick(e)
                  } else {
                    alert("Unable to delete an event with bookings.")
                  }
                }}
              >
                Delete
              </Button>
              <Popover
                variant="outlined"
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    pr: 1.6,
                  }}
                >
                  <Typography sx={{ p: 2 }}>Are you sure?</Typography>
                  <Button
                    onClick={() => handleDelete(event)}
                    size="small"
                    color="error"
                    variant="contained"
                  >
                    Yes
                  </Button>
                </Box>
              </Popover>
            </Box>
          </Paper>
        );
      })}
    </Container>
  );
};
