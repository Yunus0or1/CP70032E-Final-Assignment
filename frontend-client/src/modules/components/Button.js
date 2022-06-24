import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const ButtonRoot = styled(MuiButton)(({ theme, size }) => ({
  borderRadius: 0,
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: theme.typography.h1.fontFamily,
  padding: theme.spacing(2, 4),
  fontSize: theme.typography.pxToRem(14),
  boxShadow: "none",
  cursor: "pointer",
  "&:active, &:focus": {
    boxShadow: "none",
  },
  ...(size === "small" && {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.pxToRem(13),
  }),
  ...(size === "large" && {
    padding: theme.spacing(2, 5),
    fontSize: theme.typography.pxToRem(16),
  }),
}));

// See https://mui.com/guides/typescript/#usage-of-component-prop for why the types uses `C`.
function Button(props) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => {
        if (props.to != null) {
          navigate(props.to);
        }
      }}
    >
      <ButtonRoot {...props} />
    </Box>
  );
}

export default Button;
