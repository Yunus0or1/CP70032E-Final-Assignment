import React from "react";
import Typography from "./Typography";
import { useNavigate } from "react-router-dom";

const Link = ({ href, children }) => {
  const navigate = useNavigate();

  return (
    <Typography
      onClick={() => navigate(href)}
      sx={{
        display: "inline",
        fontSize: "inherit",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      {children}
    </Typography>
  );
};

export default Link;
