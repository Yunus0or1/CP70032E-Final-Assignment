import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "../components/AppBar";
import Typography from "../components/Typography";
import Toolbar from "../components/Toolbar";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoWhite } from "../../static/logo-white.svg";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../state/authSlice";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
  cursor: "pointer",
};

function AppAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <div
            style={{ height: "70%", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <LogoWhite />
          </div>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {user ? (
              <>
                <Typography
                  color="inherit"
                  variant="h6"
                  underline="none"
                  sx={rightLink}
                  onClick={() => navigate("/account")}
                >
                  {"Account"}
                </Typography>
                <Typography
                  variant="h6"
                  underline="none"
                  sx={{ ...rightLink, color: "secondary.main" }}
                  onClick={() => dispatch(logout())}
                >
                  {"Logout"}
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  color="inherit"
                  variant="h6"
                  underline="none"
                  sx={rightLink}
                  onClick={() => navigate("/login")}
                >
                  {"Login"}
                </Typography>
                <Typography
                  variant="h6"
                  underline="none"
                  sx={{ ...rightLink, color: "secondary.main" }}
                  onClick={() => navigate("/register")}
                >
                  {"Register"}
                </Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
