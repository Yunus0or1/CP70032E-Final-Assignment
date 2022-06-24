import React from "react";
import { Box } from "@mui/material";
import Typography from "./Typography";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectSnacks,
  addSnack,
  removeSnack,
  selectSnacksSubtotal,
} from "../../state/bookSlice";

export const SnacksSelection = ({ disabled }) => {
  const dispatch = useDispatch();
  const selectedSnacks = useSelector(selectSnacks);
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
            }}
          >
            <button
              disabled={disabled}
              onClick={() => dispatch(removeSnack({ snack }))}
              style={{
                backgroundColor: disabled ? "#e0d7da" : "#28282a",
                color: disabled ? "#a7a0a2" : "white",
                padding: "5px 10px 8px 10px",
                fontWeight: "bold",
                fontSize: 16,
                border: 0,
                width: "35px",
                height: "35px",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <Typography variant="subtitle1">{value.quantity}</Typography>
            <button
              disabled={disabled}
              onClick={() => dispatch(addSnack({ snack }))}
              style={{
                backgroundColor: disabled ? "#e0d7da" : "#28282a",
                color: disabled ? "#a7a0a2" : "white",
                padding: "5px 10px 8px 10px",
                fontWeight: "bold",
                fontSize: 16,
                border: 0,
                width: "35px",
                height: "35px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="subtitle2" sx={{ fontSize: 18 }}>
        Snacks
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {availableSnacks}
      </Box>
      <Typography variant="subtitle2" gutterBottom sx={{ fontSize: 18 }}>
        Snack Subtotal: £{snacksSubtotal.toFixed(2)}
      </Typography>
    </>
  );
};
