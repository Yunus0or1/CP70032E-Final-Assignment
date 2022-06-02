import React from "react";
import "./App.css";

// state
import { useSelector } from "react-redux";
import { selectUser } from "./state/authSlice";

// routing
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// pages/routes
import { Dashboard } from "./pages/Dashboard";
import { CreateEvent } from "./pages/CreateEvent";
import { BookClient } from "./pages/BookClient";
import { Login } from "./pages/Login";
import { Events } from "./pages/Events";

// components
import { Wrapper } from "./components/Wrapper";

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

export const App = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <Wrapper>
        <Routes>
          {/* only available to logged in users */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route index element={<Dashboard />} />
            <Route path="create-event" element={<CreateEvent />} />
            <Route path="book-client" element={<BookClient />} />
            <Route path="events" element={<Events />} />
          </Route>

          {/* only available to logged out users */}
          <Route element={<ReverseProtectedRoute user={user} />}>
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="*" element={<p>404</p>} />
        </Routes>
      </Wrapper>
    </>
  );
};

export default App;
