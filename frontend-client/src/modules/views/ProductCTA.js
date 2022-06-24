import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../state/authSlice";

function ProductCTA() {
  const navigate = useNavigate();
  const exists = useSelector(selectUser) ? true : false;

  const [value, setValue] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (exists) {
      navigate("events-list");
    } else {
      navigate("register", { state: { initialEmail: value } });
    }
  };

  return (
    <Container
      component="section"
      sx={{ mt: 10, display: "flex", color: "white", pt: 10, pb: 20 }}
    >
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "secondary.main",
              py: 8,
              px: 3,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400 }}
            >
              <Typography variant="h2" component="h2" gutterBottom>
                {exists ? "Book Event" : "Register"}
              </Typography>
              <Typography variant="h5">
                {exists
                  ? "Start booking today! It'll make you 80% cooler, we promise*"
                  : "Get your account and start booking today! It'll make you 80% cooler, we promise*"}
              </Typography>
              {exists ? (
                <Box sx={{ mt: 3 }} />
              ) : (
                <TextField
                  noBorder
                  placeholder="Your email"
                  variant="standard"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  sx={{ width: "100%", mt: 3, mb: 2 }}
                />
              )}
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: "100%" }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
              background:
                "url(https://mui.com/static/themes/onepirate/productCTAImageDots.png)",
            }}
          />
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?auto=format&fit=crop&w=750&q=80"
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;
