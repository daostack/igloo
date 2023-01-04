import React from "react";
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import { DAppProvider } from '@usedapp/core';
import { router } from "./navigation/routes";
import { dappConfig } from "./config/usedapp";
import { apolloClient } from "./config/apolloClient";
import { ToastProvider } from "./components/Toast";
import './i18n';
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <DAppProvider config={dappConfig}>
      <ApolloProvider client={apolloClient}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ApolloProvider>
    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
