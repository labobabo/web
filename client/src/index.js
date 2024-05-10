import React, { createContext } from 'react';
import ReactDOM  from 'react-dom';
import UserStore from "./store/UserStore";
import AdminStore from "./store/AdminStore";
import DoctorStore from './store/DoctorStore';
import { createRoot } from "react-dom/client";
import App from './App';




export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)
const rootElement = document.getElementById("root")
const root = createRoot(rootElement);
root.render(
  <Context.Provider
    value={{
      admin: new AdminStore(),
      user: new UserStore(),
      doctor: new DoctorStore(),


    }}
  >
    <App />
  </Context.Provider>
);

