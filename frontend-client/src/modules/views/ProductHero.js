import * as React from "react";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

// state
import { useSelector } from "react-redux";
import { selectUser } from "../../state/authSlice";

const backgroundImage =
  "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1400&q=80";

export default function ProductHero() {
  const user = useSelector(selectUser);

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Sundays
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Enjoy wide range of shows with venues all over London.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        to={"events-list"}
        sx={{ minWidth: 200 }}
      >
        {user ? "Book Event Now" : "View Events"}
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
