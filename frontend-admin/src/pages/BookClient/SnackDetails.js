import { Box, Typography, Button, IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

// state
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addSnack,
  removeSnack,
  selectSnacksList,
  selectSnacksSubtotal,
} from "../../state/bookClientSlice";

export const SnackDetails = () => {
  const dispatch = useDispatch();
  const selectedSnacks = useSelector(selectSnacksList);
  const snacksSubtotal = useSelector(selectSnacksSubtotal);

  let availableSnacks = [];

  for (const [snack, value] of Object.entries(selectedSnacks)) {
    availableSnacks.push(
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "70px", mr: 1 }}>
          <img width="100%" src={value.url} alt={value.label + " picture"} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ width: 100 }}>
              {value.label}
            </Typography>
            <Box sx={{ width: 10 }} />
            <Typography variant="subtitle2">
              £{value.price.toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              gap: 2,
            }}
          >
            <IconButton onClick={() => dispatch(removeSnack({ snack }))}>
              <RemoveCircleIcon />
            </IconButton>
            <Typography variant="subtitle1">{value.quantity}</Typography>
            <IconButton onClick={() => dispatch(addSnack({ snack }))}>
              <AddCircleIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h5">Selected Snacks</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, mb: 2 }}
      >
        {availableSnacks}
      </Box>
      <Typography gutterBottom>
        Snack Subtotal: £{snacksSubtotal.toFixed(2)}
      </Typography>
    </>
  );
};
