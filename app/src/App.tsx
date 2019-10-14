import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import ButtonDemo from './components/demos/ButtonDemo';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ButtonDemo} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}