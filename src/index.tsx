import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-nuldeossueu1rvdw.us.auth0.com"
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/movies`,
      }}
    >
      <Router>
        <ChakraProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: "green",
                  color: "white",
                },
              },
              error: {
                style: {
                  background: "#ab0000",
                  color: "white",
                },
              },
            }}
          />
          <App />
        </ChakraProvider>
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);
