import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import HTUServer from '../services/server';

interface IProps {

}


export default class CodePage extends React.Component<IProps, {}> {

  private value: string = "";

  constructor(props: any) {
    super(props);

    HTUServer.get().onEvent("verify-response").subscribe((data) => {
      if (data.data !== "no access") {
        HTUServer.get().setCookie("code", this.value);
        window.location.reload();
      }
    });
  }

  handleSubmit() {
    HTUServer.get().send('verify', {data: this.value})
  }

  handleChange(e: any) {
    this.value = e.target.value;
    this.value = this.value.trim().toUpperCase();
  }

  render() {
    return (
        <Container className = "main-menu">
          <h1>HTU: ROGUE</h1>
          <Form onSubmit={(e: any)=>{e.preventDefault(); this.handleSubmit();}}>
            <Form.Group controlId="codeForm">
              <Form.Control type="text" placeholder="Enter code" onChange={(e: any) => {this.handleChange(e)}}/>
            </Form.Group>
          </Form>
          <Button variant="danger" onClick={() => {this.handleSubmit()}}>
              Submit
          </Button>
        </Container>
    );
  }
}