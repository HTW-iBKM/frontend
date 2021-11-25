import React, {ReactElement} from 'react';
import {Router} from 'react-router-dom';
import './App.css';
import PublicRoutes from './Routes';
import { createBrowserHistory } from 'history';

class App extends React.Component {
  render(): ReactElement {
    const history = createBrowserHistory();

    return (<Router history={history}>
      <PublicRoutes></PublicRoutes>
      {/* <LandingPage></LandingPage> */}
    </Router>
    )
  }
}

export default App;
