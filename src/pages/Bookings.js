import React, { useEffect, useState } from "react";
import { Typography, Box, Container } from "@mui/material";
import { Loading } from "../components/Loading";

export const Bookings = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    setLoading(false);
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
          <Typography variant="h4">Bookings</Typography>
          <Typography>Booked Upcoming Events, Most Recent First</Typography>
        </Box>
      </Box>
    </Container>
  );
};
