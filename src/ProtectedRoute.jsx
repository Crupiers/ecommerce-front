import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to={"/auth/login"} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};