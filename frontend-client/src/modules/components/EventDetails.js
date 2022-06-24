import React from "react";
import Typography from "./Typography";
import { Box } from "@mui/material";

export const EventDetails = ({
  name,
  dateTime,
  duration,
  venueTitle,
  venueLocation,
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom sx={{ fontSize: 18 }}>
        {name}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {new Date(dateTime).toDateString()},{" "}
        {new Date(dateTime).toLocaleTimeString()}, {duration} minutes
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {venueTitle}, {venueLocation}
      </Typography>
    </Box>
  );
};
