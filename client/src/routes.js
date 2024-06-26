import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Doc from "./pages/DocMain"
import Recept from "./pages/doctorReceeptions"
import PatinfoPage from "./pages/PatinfoPage";
import userReceptions from "./pages/userReceptions";
import userCabinet from "./pages/Cabinet";
import docCabinet from "./pages/docCabinet";
import usero from "./pages/userO";
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  PINFO_ROUTE,
  DOC_ROUTE,
  DOCTORREGISTRATION_ROUTE,
  RECEPTIONS_DOC,
  RECEPTIONS_USER,
  CABINET_USER,
  CABINET_DOC, 
  USER_O,
  
} from "./utils/consts";
import { Component } from "react";


export const authRoutes = [
  {
    path: PINFO_ROUTE ,
    Component: PatinfoPage,
  },
  {
    path: RECEPTIONS_USER,
    Component: userReceptions,
  },

  {
    path: CABINET_USER,
    Component: userCabinet,
  },
  {
    path: USER_O,
    Component: usero,
  }

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
  },
  
  {
    path: CABINET_DOC,
    Component: docCabinet,
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