import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import {Auth0Provider} from "@auth0/auth0-react"
import axios from "axios";

//para que todas las peticiones empiecen y terminen en una misma base url
// axios.defaults.baseURL="http://localhost:3001" //descomentar si se quier trabajar de manera local
axios.defaults.baseURL="https://henry-gamezone-production.up.railway.app/" //conexión del front al back

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;



ReactDOM.render(
  
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <Provider store={store}>      
      <BrowserRouter>        
        <App />        
      </BrowserRouter>
    </Provider>
  </Auth0Provider>,
  
  document.getElementById("root")
);
