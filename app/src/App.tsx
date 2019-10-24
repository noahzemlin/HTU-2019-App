import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Page404 from './components/pages/Page404';
import TwoChoices from './components/demos/TwoChoices';
import HTUServer from './services/server';
import TwoChoicesHost from './components/demos/TwoChoicesHost';
import MakeGroup from './components/demos/MakeGroup';
import CodePage from './components/CodePage';
import ClientMain from './components/ClientMain';
import AdminMain from './components/AdminMain';

export default class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);

    HTUServer.get().initSocket();
  }

  render() {
    if (!HTUServer.get().loaded()) {
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
          <Route exact path="/two" component={TwoChoices} />
          <Route exact path="/twoh" component={TwoChoicesHost} />
          <Route exact path="/admin/makegroup" component={MakeGroup} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}