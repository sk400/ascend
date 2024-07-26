import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./features/auth/components/Signup";
import Signin from "./features/auth/components/Signin";
import { Provider } from "./services/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Provider>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
        </Routes>
      </Router>
    </Provider>
  </ChakraProvider>
);
