import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  updateName,
  updateDateTime,
  updateDuration,
  updatePrice,
  selectName,
  selectDateTime,
  selectDuration,
  selectPrice,
} from "../../state/createEventSlice";

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
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  inputFormat="MMMM d yyyy"
                  disableMaskedInput
                  value={new Date(useSelector(selectDateTime))}
                  onChange={(newValue) => {
                    dispatch(updateDateTime(newValue.toISOString()));
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
                    dispatch(updateDateTime(newValue.toISOString()));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 5, display: "flex", gap: 4 }}>
            <TextField
              type="number"
              value={useSelector(selectPrice)}
              onChange={(e) => dispatch(updatePrice(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              }}
            />
            <TextField
              type="number"
              value={useSelector(selectDuration)}
              onChange={(e) => dispatch(updateDuration(e.target.value))}
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
      </Grid>
    </ThemeProvider>
  );
};
