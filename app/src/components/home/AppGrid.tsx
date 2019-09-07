import React from 'react';
import IApp from '../../interfaces/IApp';
import { Container, Row, Col } from 'react-bootstrap';
import AppTile from './AppTile';

interface IProps {
    apps: IApp[];
}

export default class AppGrid extends React.Component<IProps, {}> {
  render() {
    return (
        <Container className="AppGrid">
            <Row className="justify-content-start AppGridRow">
                <Col xs={3}>
                    <AppTile app={this.props.apps[0]}/>
                </Col>
                <Col xs={3}>
                    <AppTile app={this.props.apps[1]}/>
                </Col>
             </Row>
        </Container>
    );
  }
}