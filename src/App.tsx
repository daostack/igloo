import React from 'react';
import { withTranslation } from 'react-i18next';
import { Outlet } from "react-router-dom";
import Header from './layouts/Header/Header';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default withTranslation()(App);
