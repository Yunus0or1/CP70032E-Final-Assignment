import "./App.css";

// themeing
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./modules/theme";

// state
import { useSelector } from "react-redux";
import { selectUser } from "./state/authSlice";

// routing
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// pages/routes
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EventsList } from "./pages/EventsList";
import { BookEvent } from "./pages/BookEvent";
import { Account } from "./pages/Account";
import { Checkout } from "./pages/Checkout";

// components
import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";

const ProtectedRoute = ({ user, redirectPath = "/login" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const ReverseProtectedRoute = ({ user, redirectPath = "/" }) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const user = useSelector(selectUser);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppAppBar />
        <CssBaseline />

        <Routes>
          {/* available to all users */}
          <Route index element={<Landing />} />
          <Route path="events-list" element={<EventsList />} />

          {/* only available to logged in users */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="book-event" element={<BookEvent />} />
            <Route path="account" element={<Account />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>

          {/* only available to logged out users */}
          <Route element={<ReverseProtectedRoute user={user} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="*" element={<p>404</p>} />
        </Routes>

        <AppFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
