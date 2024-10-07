import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../views/Dashboard";

const PrivateRoutes = () => [
  {
    path: "/",
    component: Dashboard,
    exact: true
  },
  {
    path: "*",
    component: () => <Redirect to="/" />,
  },
];

export default PrivateRoutes;