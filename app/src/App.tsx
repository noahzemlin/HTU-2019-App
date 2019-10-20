import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import ClientMain from './components/ClientMain';
import { isMobile } from "react-device-detect";
import Page404 from './components/pages/Page404';
import TwoChoices from './components/demos/TwoChoices';


export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <Switch>
          { isMobile && <Route exact path="/" component={ClientMain} /> }
          { !isMobile && <Route exact path="/" component={Page404} /> }
          <Route exact path="/two" component={TwoChoices} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}