import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import LinkButton from './LinkButton';

interface IProps {

}

export default class ClientMain extends React.Component<IProps, {}> {
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
        </Container>
    );
  }
}