import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../state/authSlice";

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  console.log(user);

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
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography variant="h4">WestTheatre Dashboard</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>
              Welcome,{" "}
              <b>
                {user.firstName} {user.lastName}
              </b>
            </Typography>
            <Typography>
              You are a <b>{user.userType}</b>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={() => navigate("/events")}>
              Event List
            </Button>
            <Button variant="contained" onClick={() => navigate("/bookings")}>
              Booking List
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
