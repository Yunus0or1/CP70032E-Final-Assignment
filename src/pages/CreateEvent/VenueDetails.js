import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useSelector, useDispatch } from "react-redux";
import {
  addVenue,
  deleteVenue,
  selectVenues,
} from "../../state/createEventSlice";

export const VenueDetails = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [allVenues, setVenues] = useState();
  const selectedVenues = useSelector(selectVenues);

  useEffect(() => {
    handleFetchData();
  });

  const handleFetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    setVenues(theatreList);
    setLoading(false);
  };

  return loading ? (
    <Box
      sx={{
        width: "100%",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
        },
      }}
    >
      {Object.keys(allVenues).map((key) => {
        const venue = allVenues[key];

        return (
          <Card key={venue.title} variant="outlined">
            <Box sx={{ display: "flex", m: 1 }}>
              <Checkbox
                defaultChecked={Object.hasOwn(selectedVenues, key)}
                onClick={(e) =>
                  e.target.checked
                    ? dispatch(addVenue({ key: key, value: venue }))
                    : dispatch(deleteVenue(key))
                }
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{venue.title}</Typography>
                <Typography variant="caption">{venue.location}</Typography>
              </Box>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

const theatreList = {
  theatre1: {
    id: "0",
    title: "The Supermax",
    identifierTitle: "theater1",
    location: "Ealing Broadway",
    totalSeats: 231,
    seats: {
      A: [1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      B: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      C: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      D: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      E: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      F: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      G: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      H: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      J: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      K: [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      L: [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      M: [1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 1, 3, 1, 1],
    },
  },
  theatre2: {
    id: "1",
    title: "Regent Feature Cinema",
    identifierTitle: "theater2",
    location: "Regent Street",
    totalSeats: 150,
    seats: {
      A: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      B: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      C: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      D: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      E: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      F: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      G: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      H: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
  },
  theatre3: {
    id: "2",
    title: "Ultimate 3D",
    identifierTitle: "theater3",
    location: "Shepherd's Bush",
    totalSeats: 59,
    seats: {
      A: [1, 1, 1, 1, 1, 1, 1],
      B: [1, 1, 1, 1, 1, 1, 1, 1],
      C: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      D: [1, 1, 1, 1, 1, 1, 1, 1],
      E: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      F: [1, 1, 1, 1, 1, 1, 1, 1],
      G: [1, 3, 1, 1, 1, 1, 1],
      H: [1, 1, 1, 1],
    },
  },
};
