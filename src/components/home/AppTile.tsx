import React from 'react';
import { Figure } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import IApp from '../../interfaces/IApp';

interface IProps {
  app: IApp;
}

export default class AppTile extends React.Component<IProps, {}> {
  render() {
    return (
      <div>
        <LinkContainer to={this.props.app.path}>
          <Figure.Image src={this.props.app.icon_path} rounded />
        </LinkContainer>
        <Figure.Caption className="AppTileText">
          {this.props.app.name}
        </Figure.Caption>
      </div>
    );
  }
}