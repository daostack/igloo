import React from 'react';
import { withTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Space } from './interfaces/snapshot';
import Header from './layouts/Header/Header';
import { GET_SPACES } from './graphql/snapshot/queries';
import './App.css';

function App() {
  const { loading, error, data } = useQuery(GET_SPACES);
  console.log(data);
  const spaces = !loading && data.spaces.map((space: Space) => {
    return <span>{space.id} ; {space.name}</span>
  })

  return (
    <div className="app">
      <Header />
      {loading && <span>LOADING SPACES...</span>}
      {!loading && spaces}
    </div>
  );
}

export default withTranslation()(App);
