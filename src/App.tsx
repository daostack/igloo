import React from 'react';
import { useEthers } from '@usedapp/core';
import { t } from "i18next";
import { withTranslation } from 'react-i18next';
import i18n from './i18n';
import './App.css';

function App() {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div className="app">
      {!account && <button onClick={() => activateBrowserWallet()}>{t('Connect')}</button>}
      {account && <button onClick={() => deactivate()}>{t('Disconnect')}</button>}
      {account && <p>{t('Account')} {account}</p>}
      <button onClick={() => changeLanguage('es')}>es</button>
      <button onClick={() => changeLanguage('en')}>en</button>
    </div>
  );
}

export default withTranslation()(App);
