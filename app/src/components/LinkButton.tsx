import { LinkContainer } from "react-router-bootstrap";

import { Button } from "react-bootstrap";
import React from "react";

interface IButttonProps {
    href: string;
    disabled?: boolean;
  }
  
export default class LinkButton extends React.Component<IButttonProps, {}> {
  render() {
    return (
        <LinkContainer to={this.props.href}>
            <div>
                <Button disabled={this.props.disabled}>{this.props.children}</Button>
            </div>
        </LinkContainer>
    );
  }
  }