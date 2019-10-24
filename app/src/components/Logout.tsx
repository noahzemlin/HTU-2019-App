import React from 'react';
import { Container } from 'react-bootstrap';
import HTUServer from '../services/server';

interface IProps {

}


export default class Logout extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props);
    HTUServer.get().wipe();
  }
  render() {
    return (
        <Container className = "main-menu">
          <h1>Logged out!</h1>
        </Container>
    );
  }
}