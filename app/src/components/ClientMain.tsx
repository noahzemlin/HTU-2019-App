import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import LinkButton from './LinkButton';
import { Button } from 'react-bootstrap';
import HTUServer from '../services/server';

interface IProps {

}

interface IState {
  channel: number;
}

export default class ClientMain extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {channel: HTUServer.get().getChannel()};
  }

  public setChannel(channel: number) {
    HTUServer.get().setChannel(channel);
    this.setState({channel: channel});
  }

  render() {
    return (
        <Container className = "main-menu">
          <Row>
            <Col><h1>User</h1></Col>
            <Col><h1>Host</h1></Col>
          </Row>
          <Row>
            <Col><LinkButton href="/two">Demo 1</LinkButton></Col>
            <Col><LinkButton href="/twoh">Demo 1</LinkButton></Col>
          </Row>
          <Row>
            <Col><LinkButton href="/yo" disabled={true}>Demo 2</LinkButton></Col>
            <Col><LinkButton href="/yo" disabled={true}>Demo 2</LinkButton></Col>
          </Row>
          <Row>
            <Col><Button disabled={this.state.channel === 1} onClick={()=>{this.setChannel(1)}}>Ch1</Button></Col>
            <Col><Button disabled={this.state.channel === 2} onClick={()=>{this.setChannel(2)}}>Ch2</Button></Col>
            <Col><Button disabled={this.state.channel === 3} onClick={()=>{this.setChannel(3)}}>Ch3</Button></Col>
            <Col><Button disabled={this.state.channel === 4} onClick={()=>{this.setChannel(4)}}>Ch4</Button></Col>
          </Row>
        </Container>
    );
  }
}