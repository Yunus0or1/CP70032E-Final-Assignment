import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { useSelector, useDispatch } from "react-redux";
import {
  updateName,
  updateDateTime,
  updateDuration,
  selectName,
  selectDateTime,
  selectDuration,
} from "../../state/createEventSlice"

const theme = createTheme();

export const EventDetails = () => {
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            autoFocus
            id="eventName"
            name="eventName"
            label="Event Name"
            value={useSelector(selectName)}
            onChange={(e) => dispatch(updateName(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mt: 3 }}>
            <Chip label="Event Start" />
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  inputFormat="MMMM d yyyy"
                  disableMaskedInput
                  value={new Date(useSelector(selectDateTime))}
                  onChange={(newValue) => {
                    dispatch(updateDateTime(newValue.toISOString()))
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
                  disableMaskedInput
                  value={new Date(useSelector(selectDateTime))}
                  onChange={(newValue) => {
                    dispatch(updateDateTime(newValue.toISOString()))
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mt: 5 }}>
              <Chip label="Event Duration" />
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 5 }} />
            <Slider
              aria-label="Duration"
              value={useSelector(selectDuration)}
              onChange={(e, newValue) => dispatch(updateDuration(newValue))}
              valueLabelFormat={(duration) => <div>{duration} minutes</div>}
              valueLabelDisplay="on"
              step={5}
              marks
              min={10}
              max={240}
            />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
