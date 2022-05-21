import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Person from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";

const theme = createTheme();

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // access form information
    // const data = new FormData(event.currentTarget);
    // console.log({
    //     email: data.get("email"),
    //     password: data.get("password"),
    //   });

    // mimic API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const user = {
      id: "248",
      name: "Bobby",
      email: "bobb@mail.com",
      password: "ok",
    };

    setLoading(false);

    const successful = true;
    if (successful) {
      // upon success, set id, clear the form and head to home
      dispatch(login(user));
      event.target.reset();
      navigate("/");
    } else {
      setAlert({ type: "error", message: "Something went wrong." });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // setting opacity and ignoring mouse events during loading
            opacity: loading ? 0.5 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: alert ? "block" : "none" }}>
                <Alert severity={alert?.type}>{alert?.message}</Alert>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
