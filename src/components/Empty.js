import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Empty = ({text}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {text}
      </Typography>
    </Box>
  );
};
