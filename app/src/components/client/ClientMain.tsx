import React from 'react';
import { Container } from 'react-bootstrap';
import TwoChoices from './TwoChoices';
import HTUServer from '../../services/server';
import TwoChoices2 from './TwoChoices2';
import Survey from './Survey';

interface IProps {

}

interface IState {
  location: number;
}

export default class ClientMain extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {location: 0}

    HTUServer.get().onEvent("switch-clients-action").subscribe((data: any) => {
      let newState: IState = this.state;
      if (HTUServer.get().getRole() === "Android") {
        console.log("yo, moving to " + data.android_pos);
        newState.location = data.android_pos;
      } else if (HTUServer.get().getRole() === "Cyborg") {
        console.log("yo, moving to " + data.cyborg_pos);
        newState.location = data.cyborg_pos;
      }
      this.setState(newState);
  });
  }
  render() {
    if (this.state.location === 1) {
      return (
        <TwoChoices/>
      );
    }
    if (this.state.location === 3) {
      return (
        <TwoChoices2/>
      );
    }
    if (this.state.location === 5) {
      return (
        <Survey/>
      );
    }
    return (
        <Container className = "main-menu">
          <h1>HTU: ROGUE</h1>
        </Container>
    );
  }
}