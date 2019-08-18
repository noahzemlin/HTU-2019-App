import React from 'react';
import { Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface IProps {
  returnTo: string;
}

export default class ReturnBar extends React.Component<IProps, {}> {
  render() {
    return (
      <div className="return-bar">
        <LinkContainer to={this.props.returnTo}>
          <Image src="/favicon.ico" />
        </LinkContainer>
        <LinkContainer to={"/"}>
          <Image src="/favicon.ico" />
        </LinkContainer>
      </div>
    );
  }
}