import {
  TextField,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import { formatAMPM } from "../../utility/formatAMPM";

import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  selectName,
  selectEvent,
  selectSeatList,
  selectSnacksList,
  selectSnacksSubtotal,
} from "../../state/bookClientSlice";

export const Reservation = () => {
  const dispatch = useDispatch();

  const name = useSelector(selectName);
  const selectedEvent = useSelector(selectEvent);
  const selectedSeatList = useSelector(selectSeatList);
  const snacksList = useSelector(selectSnacksList);
  const snacksSubtotal = useSelector(selectSnacksSubtotal);

  const seatSubtotal = selectedSeatList.length * selectedEvent.eventPrice;
  const total = seatSubtotal + snacksSubtotal;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Summary
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
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {selectedSeatList.map((seat) => (
          <Chip label={seat.rowKey + "" + (seat.index + 1)} />
        ))}
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {Object.values(snacksList).map((snack) => (
          <Chip label={snack.quantity + " × " + snack.label} />
        ))}
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Seats : £" + seatSubtotal.toFixed(2)} />
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Snacks: £" + snacksSubtotal.toFixed(2)} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} sm={6}>
        <List
          disablePadding
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            height: "100%",
          }}
        >
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText>
              <Typography sx={{ fontWeight: "bold" }}>
                {"Total £" + total.toFixed(2)}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12}>
        <TextField
          sx={{ width: "100%" }}
          label="Customer Name"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
      </Grid>
    </Grid>
  );
};
