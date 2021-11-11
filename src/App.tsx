import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import PublicRoutes from './Routes';
import LandingPage from './sites/landinpage/landingpage';

class App extends React.Component<any, { count: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleClickEvent = this.handleClickEvent.bind(this);
  }

  handleClickEvent() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (<HashRouter>
      <PublicRoutes></PublicRoutes>
      {/* <LandingPage></LandingPage> */}
    </HashRouter>
    )
  }
}

export default App;
