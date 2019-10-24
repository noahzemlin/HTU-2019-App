import React from 'react';
import { Container } from 'react-bootstrap';
import TwoChoices from './TwoChoices';
import HTUMessage from '../../models/htumessage';
import HTUServer from '../../services/server';
import TwoChoices2 from './TwoChoices2';

interface IProps {

}

interface IState {
  location: string;
}

export default class ClientMain extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {location: ""}

    HTUServer.get().onEvent("switch-clients-action").subscribe((data: HTUMessage) => {
      let newState: IState = this.state;
      newState.location = data.data;
      this.setState(newState);
  });
  }
  render() {
    if (this.state.location === "TwoChoices") {
      return (
        <TwoChoices/>
      );
    }
    if (this.state.location === "TwoChoices2") {
      return (
        <TwoChoices2/>
      );
    }
    return (
        <Container className = "main-menu">
          <h1>HTU: ROGUE</h1>
        </Container>
    );
  }
}