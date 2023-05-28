import React from 'react';
import './app-header.css';

const AppHeader = ({players, commands, messages}) => {
  return (
    <div className="app-header d-flex">
      <h1>Dota search</h1>
      <h2>{messages} messages, {commands} commands, {players} players</h2>
    </div>
  );
};

export default AppHeader;
