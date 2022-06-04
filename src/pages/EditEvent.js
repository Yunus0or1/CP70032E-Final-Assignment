import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Box,
  InputAdornment,
  Slider,
  Divider,
  Chip,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useLocation, useNavigate } from "react-router-dom";
import EventsService from "../services/events/index";

export const EditEvent = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const event = state?.event;

  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState(event.movieName);
  const [dateTime, setDateTime] = useState(event.eventTime);
  const [duration, setDuration] = useState(event.eventDuration);

  const handleSave = async () => {
    setLoading(true);

    // making new obj w/ matching frontend lingo into backend spec
    const updatedEvent = Object.assign({}, event, {
      eventId: event.id,
      movieName: eventName,
      eventTime: dateTime,
      eventDuration: duration.toString(),
      venueList: [event.venue],
    });

    const res = await EventsService.editEvent({ updatedEvent: updatedEvent });

    if (res.status) {
      navigate("/events");
    } else {
      alert(res.responseMessage);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper variant="outlined" sx={{ p: 4, mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Edit Event
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              disabled={loading}
              autoFocus
              id="eventName"
              name="eventName"
              label="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    inputFormat="MMMM d yyyy"
                    disabled={loading}
                    disableMaskedInput
                    value={new Date(dateTime)}
                    onChange={(newValue) => {
                      setDateTime(newValue.toISOString());
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Time"
                    inputFormat="hh:mm a"
                    disabled={loading}
                    disableMaskedInput
                    value={new Date(dateTime)}
                    onChange={(newValue) => {
                      setDateTime(newValue.toISOString());
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 5 }} />
              <TextField
                sx={{ width: "100%" }}
                disabled={loading}
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      minutes (runtime)
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 1, display: "flex", justifyContent: "end" }}
          >
            <Button variant="contained" onClick={handleSave} disabled={loading}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
