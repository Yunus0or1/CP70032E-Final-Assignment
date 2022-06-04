import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { formatAMPM } from "../../utility/formatAMPM";

import { useSelector } from "react-redux";
import { selectEvent } from "../../state/bookClientSlice";

export const EventDetails = () => {
  const selectedEvent = useSelector(selectEvent);

  console.warn(selectedEvent);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Event Confirmation
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            p: 1,
            fontSize: "20px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
            fontStyle: "italic",
            fontFamily: "Monospace",
          }}
          gutterBottom
        >
          {selectedEvent.movieName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={new Date(selectedEvent.eventTime).toDateString()}
            />
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={formatAMPM(new Date(selectedEvent.eventTime))}
              secondary={"For " + selectedEvent.eventDuration + " minutes"}
            />
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={"Ticket Price: £" + selectedEvent.eventPrice.toFixed(2)}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={6}>
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={selectedEvent.venue.title}
              secondary={selectedEvent.venue.location}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
