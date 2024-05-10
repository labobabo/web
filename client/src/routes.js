import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Doc from "./pages/DocMain"
import Recept from "./pages/doctorReceeptions"
import PatinfoPage from "./pages/PatinfoPage";
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  PINFO_ROUTE,
  DOC_ROUTE,
  DOCTORREGISTRATION_ROUTE,
  RECEPTIONS_DOC,
  
} from "./utils/consts";
import { Component } from "react";


export const authRoutes = [
  {
    path: PINFO_ROUTE ,
    Component: PatinfoPage,
  },

];
export const adminRoutes = [

  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const docRoutes = [
  {
    path: DOC_ROUTE,
    Component: Doc,

  },
  {
    path: RECEPTIONS_DOC,
    Component: Recept,
  }

];




export const publishRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DOCTORREGISTRATION_ROUTE,
    Component: Auth,
  },


];