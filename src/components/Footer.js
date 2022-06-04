import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export const Footer = (props) => {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};
