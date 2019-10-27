import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Page404 from './components/pages/Page404';
import HTUServer from './services/server';
import MakeGroup from './components/admin/MakeGroup';
import CodePage from './components/CodePage';
import ClientMain from './components/client/ClientMain';
import AdminMain from './components/admin/AdminMain';
import Logout from './components/Logout';

export default class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);

    HTUServer.get().initSocket();
  }

  render() {
    if (!HTUServer.get().loaded()) {
      console.log("waiting 4 load");
      setTimeout(() => {this.forceUpdate()}, 200);
      return (<div />);
    }
    return (
      <Router>
        <Switch>
          { isMobile && HTUServer.get().getRole() === '' && <Route exact path="/" component={CodePage} /> }
          { isMobile && HTUServer.get().getRole() === 'Admin' && <Route exact path="/" component={AdminMain} /> }
          { isMobile && <Route exact path="/" component={ClientMain} /> }
          { !isMobile && <Route exact path="/" component={Page404} /> }
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/admin/makegroup" component={MakeGroup} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}