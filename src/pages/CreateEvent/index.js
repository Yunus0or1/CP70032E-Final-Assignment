import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// stages
import { EventDetails } from "./EventDetails";
import { VenueDetails } from "./VenueDetails";
import { ConfirmCreation } from "./ConfirmCreation";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  selectAll,
  selectName,
  selectDateTime,
  selectVenues,
} from "../../state/createEventSlice";

const steps = ["Event", "Venues", "Confirm"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EventDetails />;
    case 1:
      return <VenueDetails />;
    case 2:
      return <ConfirmCreation />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export const CreateEvent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState();

  // useds for validation
  const name = useSelector(selectName);
  const venues = useSelector(selectVenues);
  const dateTime = useSelector(selectDateTime);
  const all = useSelector(selectAll);

  const validate = async () => {
    // there needs to be a name
    if (name.trim().length === 0) {
      window.alert("Name of the event needs to have at least one character.");
      return;
    }
    // there needs to be at least one theatre
    if (Object.keys(venues).length === 0) {
      window.alert("You need to select at least one venue.");
      return;
    }
    // the time and date can't be in the past
    var current = new Date();
    var booked = new Date(dateTime);
    if (current > booked) {
      window.alert("The booking date cannot be in the past.");
      return;
    }

    // minimicing waiting for server response
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);

    const successful = true;
    if (successful) {
      // move onto final step
      setActiveStep(activeStep + 1);
      // store cache to use in final success feedback to user before resetting fields
      setCache(all); // shit solution i know but in a rush and it works
      // clear the current event fields
      dispatch(reset());
    } else {
      window.alert("unsuccessful server response");
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) validate();
    else setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          mb: 4,
          // loading configuration
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Create Event
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  You have created the event.
                </Typography>
                <Typography variant="subtitle1">
                  A new event,{" "}
                  <Typography sx={{ fontWeight: "bold", display: "inline" }}>
                    {cache.name}
                  </Typography>
                  , has been created.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={() => setActiveStep(0)}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Create Another
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Back home
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Confirm Creation"
                      : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
