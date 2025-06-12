import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import View from "./pages/View";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/view"
          element={
            <PrivateRoute>
              <View />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
