import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import HTUServer from '../../services/server';
import ViewDec1 from './ViewDec1';
import MakeGroup from './MakeGroup';
import ViewDec2 from './ViewDec2';
import ViewDec3 from './ViewDec3';

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
            <Button onClick={()=>{this.handleViewClick("ViewDec1")}}>Decision 1</Button>
            <Button onClick={()=>{this.handleViewClick("ViewDec2")}}>Decision 2</Button>
            <Button onClick={()=>{this.handleViewClick("ViewDec3")}}>Decision 3</Button>
            <Button onClick={()=>{this.handleViewClick("GroupMaker")}}>Group Maker</Button>
          </Container>
      );
    }
    if (this.state.page === "ViewDec1") {
      return (
          <ViewDec1 onBack={()=>{this.handleViewClick("none")}}/>
      );
    }
    if (this.state.page === "ViewDec2") {
      return (
          <ViewDec2 onBack={()=>{this.handleViewClick("none")}}/>
      );
    }
    if (this.state.page === "ViewDec3") {
      return (
          <ViewDec3 onBack={()=>{this.handleViewClick("none")}}/>
      );
    }
    if (this.state.page === "GroupMaker") {
      return (
          <MakeGroup onBack={()=>{this.handleViewClick("none")}}/>
      );
    }
  }
}