import React from 'react';
import './App.css';
import Router from './router';
import ThemeConfig from './theme';

function App() {
  return (
    <ThemeConfig>
      <Router />
    </ThemeConfig>
  );
}

export default App;
