import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavList } from "./NavList";
import { Footer } from "../components/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../state/authSlice";

const drawerWidth = 280;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7),
      },
    }),
  },
}));

const mdTheme = createTheme();

export function Wrapper({ children }) {
  const user = useSelector(selectUser);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return user ? (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          <NavList />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {children}
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  ) : (
    <>
      {children}
      <Footer />
    </>
  );
}

// export default function Dashboard() {
//   return <DashboardContent />;
// }

// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
// import Person from "@mui/icons-material/Person";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import { useNavigate } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";
// import { logout, selectUser } from "../state/authSlice";

// export function Header() {
//   const user = useSelector(selectUser);

// const dispatch = useDispatch();
// const navigate = useNavigate();

//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const pages = [
//     {
//       name: "Create Event",
//       url: "/create-event",
//     },
//     {
//       name: "Book for Client",
//       url: "/book-client",
//     },
//   ];

//   const settings = user?.id
//     ? [
//         {
//           key: "0",
//           name: "Welcome, " + user.name + " (" + user.id + ")",
//           action: () => {},
//         },
//         {
//           key: "1",
//           name: "Logout",
//           action: () => {
//             navigate("/");
//             dispatch(logout());
//           },
//         },
//       ]
//     : [
//         {
//           key: "1",
//           name: "Login",
//           action: () => {
//             navigate("/login");
//           },
//         },
//       ];

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <TheaterComedyIcon
//             sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
//           />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             onClick={() => navigate("/")}
//             sx={{
//               cursor: "pointer",
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".1rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             WestTheatre
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             {/* MOBILE VIEW */}
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem
//                   key={page.name}
//                   onClick={() => {
//                     handleCloseNavMenu();
//                     navigate(page.url);
//                   }}
//                 >
//                   <Typography textAlign="center">{page.name}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           {/* DESKTOP VIEW */}
//           <TheaterComedyIcon
//             sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
//           />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             onClick={() => navigate("/")}
//             sx={{
//               cursor: "pointer",
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".1rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             WestTheatre
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Typography
//               key={page.name}
//               onClick={() => {
//                 handleCloseNavMenu();
//                 navigate(page.url);
//               }}
//               sx={{ mr: 2, cursor: "pointer" }}
//               >
//                 {page.name}
//                 </Typography>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar sx={{ bgcolor: "secondary.main" }}>
//                   <Person />
//                 </Avatar>
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting.key} onClick={setting.action}>
//                   <Typography textAlign="center">{setting.name}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
