import React from 'react';
import './App.css';
import Router from './router';
import ThemeConfig from './theme';
import BasicModal from './components/ModalInformation';

function App() {
  return (
    <ThemeConfig>
      <Router />
      <BasicModal />
    </ThemeConfig>
  );
}

export default App;
