import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from './components/home/Main';
import MessageApp from './components/messageapp/Main';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/message/" component={MessageApp} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}