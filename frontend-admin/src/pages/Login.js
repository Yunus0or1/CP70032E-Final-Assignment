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
import AuthService from "../services/auth/index";

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
    const data = new FormData(event.currentTarget);

    const res = await AuthService.login({
      email: data.get("email"),
      password: data.get("password"),
    });

    if (res.status) {
      // check if the user is either Staff or Manager
      if (res.user.userType === "Staff" || res.user.userType === "Manager") {
        // upon success, set user, clear the form and head to home
        dispatch(login(res.user));
        event.target.reset();
        navigate("/");
      } else {
        setLoading(false);
        setAlert({ type: "error", message: "You are not authorized to use admin panel." });
      }
    } else {
      setLoading(false);
      setAlert({ type: "error", message: res.responseMessage });
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
                  disabled={loading}
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
                  disabled={loading}
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
              disabled={loading}
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
