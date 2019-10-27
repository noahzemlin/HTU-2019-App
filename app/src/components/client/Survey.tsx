import React from 'react';
import { Button } from 'react-bootstrap';
import HTUServer from '../../services/server';

interface IProps {
}

export default class Survey extends React.Component<IProps, {}> {

  handleButtonClick() {
    HTUServer.get().send('finish', {data: HTUServer.get().getRole()});
    HTUServer.get().wipe();
    window.location.reload();
  }

  render() {
    return (
        <div>
            <h1>Survey goes here</h1>
            <br />
            <Button onClick={()=>{this.handleButtonClick()}}>Submit</Button>
        </div>
    );
  }
}