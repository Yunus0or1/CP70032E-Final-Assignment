import React from "react";
import { Box } from "@mui/material";
import Typography from "./Typography";
import Button from "./Button";

export const SeatButton = ({
  seat,
  price,
  buttonLabel = "Remove",
  onClick,
  disabled = false,
}) => {
  return (
    <Box
      sx={{
        border: "1px dotted black",
        display: "flex",
        justifyContent: "space-between",
        p: 1.3,
        pb: 1.1,
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h4">
          {seat.rowKey}
          {seat.index + 1}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {price != null ? "£" + price : ""}
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="small"
        onClick={onClick}
        disabled={disabled}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};
