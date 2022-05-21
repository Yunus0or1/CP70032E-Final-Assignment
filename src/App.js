import React from "react";
import "./App.css";

// state
import { useSelector } from "react-redux";
import { selectId } from "./state/authSlice";

// routing
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// pages/routes
import { Landing } from "./pages/Landing";
import { Book } from "./pages/Book";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

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
  const user = useSelector(selectId);

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Landing />} />

        {/* only available to logged in users */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="book" element={<Book />} />
        </Route>

        {/* only available to logged out users */}
        <Route element={<ReverseProtectedRoute user={user} />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<p>404</p>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
