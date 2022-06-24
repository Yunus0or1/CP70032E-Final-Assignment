import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AppForm from "../modules/views/AppForm";
import Box from "@mui/material/Box";
import Button from "../modules/components/Button";
import Typography from "../modules/components/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import EventsService from "../services/events/index";
import { calculateAvailableSeats } from "../utility/calculateAvailableSeats";

export const EventsList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);

  const getEvents = () => {
    return data.length === 0 ? allData : data;
  };

  // filtering through events, function for dropdown
  const [venueList, setVenueList] = React.useState([
    {
      identifierTitle: "theater1",
      location: "Ealing Broadway",
      title: "The Supermax",
    },
    {
      identifierTitle: "theater2",
      location: "Regent Street",
      title: "Regent Feature Cinema",
    },
    {
      identifierTitle: "theater3",
      location: "Shepherd's Bush",
      title: "Ultimate 3D",
    },
  ]);
  const [selectedVenue, setSelectedVenue] = React.useState("");

  const handleSelectVenueChange = (event) => {
    const newSelected = event.target.value;
    if (newSelected == null) {
      setSelectedVenue(newSelected);
      setData([]);
    } else {
      const newSelected = event.target.value;
      setSelectedVenue(newSelected);

      setData(
        allData.filter((event) => {
          return event.venue.identifierTitle == newSelected;
        })
      );
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    const res = await EventsService.getEvents();

    // get upcoming events only
    const final = res.eventList.filter((event) => {
      const upcoming = new Date(event.eventTime) > new Date();
      const seatsAvailable = calculateAvailableSeats(event.venue.seats) > 0;
      return upcoming && seatsAvailable;
    });

    // sorting upcoming events by date
    function compare(a, b) {
      if (new Date(a.eventTime) > new Date(b.eventTime)) return 1;
      if (new Date(a.eventTime) < new Date(b.eventTime)) return -1;
      return 0;
    }
    final.sort(compare);

    // loading data from the server into the data hook variable
    setAllData(final);
    setLoading(false);
  };

  return loading ? (
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
    <AppForm size="lg" sx={{ p: 4, minHeight: "80vh" }}>
      <Typography
        variant="h3"
        gutterBottom
        marked="center"
        align="center"
        sx={{ mb: 6 }}
      >
        Events List
      </Typography>

      <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
        <FormControl sx={{ width: "400px" }}>
          <InputLabel id="demo-simple-select-label">Select Venue</InputLabel>
          <Select
            // variant="standard"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedVenue}
            label="Choose Venue"
            onChange={handleSelectVenueChange}
          >
            <MenuItem value={null}>All</MenuItem>
            {venueList.map((venue) => {
              return (
                <MenuItem value={venue.identifierTitle}>
                  {venue.title}, {venue.location}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      
      <Grid container>
        {getEvents().map((e) => {
          return (
            <Grid item xs={12} md={6} sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px dotted black",
                  p: 2,
                }}
              >
                <Box sx={{ borderBottom: "1px dashed black", mb: 2 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontSize: 28 }}>
                    {e.movieName}
                  </Typography>
                </Box>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                      sx={{ fontSize: 18 }}
                    >
                      {new Date(e.eventTime).toDateString()},{" "}
                      {new Date(e.eventTime).toLocaleTimeString()}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                    >
                      {calculateAvailableSeats(e.venue.seats)} of{" "}
                      {e.venue.totalSeats} seats available.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                    >
                      {e.venue.title}, {e.venue.location}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      // size="large"
                      component="a"
                      onClick={() => {
                        navigate("/book-event", {
                          state: { event: e },
                        });
                      }}
                      sx={{ minWidth: 100 }}
                    >
                      Book • £{e.eventPrice.toFixed(2)}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </AppForm>
  );
};
