import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import HTUServer from '../services/server';

interface IProps {

}


export default class AdminMain extends React.Component<IProps, {}> {
  handleClick(place:string) {
    HTUServer.get().send('switch-clients', {data: place});
  }
  render() {
    return (
        <Container className = "main-menu">
          <h1>HTU: ROGUE</h1>
          <h1>Admin</h1>
          <Button onClick={()=>{this.handleClick("TwoChoices")}}>Decision 1</Button>
          <Button onClick={()=>{this.handleClick("TwoChoices2")}}>Decision 2</Button>
          <Button onClick={()=>{this.handleClick("")}}>Blank</Button>
        </Container>
    );
  }
}