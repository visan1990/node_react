import React from "react";
import { Redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import FormularioRegistro from "../views/Registro/FormularioRegistro";

const PublicRoutes = () => [
  {
    path: "/",
    component: LoginPage,
    exact: true
  },
  {
    path: "/registro",
    component: FormularioRegistro,
    exact: true
  },
  {
    path: "*",
    component: () => <Redirect to="/" />,
  },
];

export default PublicRoutes;