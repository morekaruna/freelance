import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import React, { useState, useEffect, useContext } from "react";



function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
