import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import HTUServer from '../../services/server';
import TwoChoicesHost from './TwoChoicesHost';

interface IProps {

}

interface IState {
  page: string;
}


export default class AdminMain extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {page: "none"};
  }

  handleButtonClick(place:string) {
    HTUServer.get().send('switch-clients', {data: place});
  }

  handleViewClick(view:string) {
    this.setState({page: view});
  }

  render() {
    if (this.state.page === "none") {
      return (
          <Container className = "main-menu">
            <h1>HTU: ROGUE</h1>
            <h1>Admin</h1>
            <Button onClick={()=>{this.handleButtonClick("TwoChoices")}}>Decision 1</Button>
            <Button onClick={()=>{this.handleButtonClick("TwoChoices2")}}>Decision 2</Button>
            <Button onClick={()=>{this.handleButtonClick("")}}>Blank</Button>
            <Button onClick={()=>{this.handleViewClick("TwoChoices")}}>Viewer</Button>
          </Container>
      );
    }
    if (this.state.page === "TwoChoices") {
      return (
          <TwoChoicesHost onBack={()=>{this.handleViewClick("none")}}/>
      );
    }
  }
}