import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

interface IProps {
    href: string;
    speed?: number;
}

export default class HTUButton extends React.Component<IProps, {}> {
  render() {
    return (
        <div className="htu-button" style={{animationDuration: this.props.speed + "s"}}>
            <div style={{animationDuration: this.props.speed + "s"}}>{this.props.children}</div>
        </div>
    );
  }
}