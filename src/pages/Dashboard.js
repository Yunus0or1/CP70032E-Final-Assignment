import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";

export const Dashboard = () => {
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h4">Dashboard</Typography>
          <Button variant="contained">Event List</Button>
          <Button variant="contained">Booking List</Button>
        </Box>
      </Container>
    </>
  );
};
