import React from 'react';
import { useEthers } from '@usedapp/core';
import { t } from "i18next";
import { withTranslation } from 'react-i18next';
import { gql, useQuery } from '@apollo/client';
import i18n from './i18n';
import './App.css';
import { Space } from './interfaces/snapshot';

const GET_SPACES = gql`
query Spaces {
  spaces(
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    name
  }
}
`;

function App() {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const { loading, error, data } = useQuery(GET_SPACES);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  console.log(data);
  const spaces = !loading && data.spaces.map((space: Space) => {
    return <span>{space.id} ; {space.name}</span>
  })

  return (
    <div className="app">
      {!account && <button onClick={() => activateBrowserWallet()}>{t('Connect')}</button>}
      {account && <button onClick={() => deactivate()}>{t('Disconnect')}</button>}
      {account && <p>{t('Account')} {account}</p>}
      <button onClick={() => changeLanguage('es')}>es</button>
      <button onClick={() => changeLanguage('en')}>en</button>
      <a href='/test-route'>TEST ROUTH</a>
      {loading && <span>LOADING SPACES...</span>}
      {!loading && spaces}
    </div>
  );
}

export default withTranslation()(App);
