import React, {ReactElement} from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import PublicRoutes from './Routes';


function App(): ReactElement {
  return (
      <HashRouter>
        <PublicRoutes></PublicRoutes>
        {/* <LandingPage></LandingPage> */}
      </HashRouter>
  );
}

export default App;
