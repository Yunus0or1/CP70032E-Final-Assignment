import React from "react";
import "./App.css";

// state
import { useSelector } from "react-redux";
import { selectUser } from "./state/authSlice";

// routing
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// pages/routes
import { Landing } from "./pages/Landing";
import { CreateEvent } from "./pages/CreateEvent";
import { BookClient } from "./pages/BookClient";
import { Login } from "./pages/Login";

// components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const ProtectedRoute = ({ user, redirectPath = "/" }) => {
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
      <Header />
      <Routes>
        <Route index element={<Landing />} />

        {/* only available to logged in users */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="book-client" element={<BookClient />} />
        </Route>

        {/* only available to logged out users */}
        <Route element={<ReverseProtectedRoute user={user} />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="*" element={<p>404</p>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
