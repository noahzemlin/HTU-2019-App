import React from 'react';
import HTUServer from '../../services/server';

interface IProps {
    type: number;
    msg: string;
    speed?: number;
}

export default class HTUButton extends React.Component<IProps, {}> {
  render() {
    return (
        <div className="htu-button" style={{animationDuration: this.props.speed + "s"}} onClick={()=>{HTUServer.get().send({type: this.props.type, data: this.props.msg})}}>
            <div style={{animationDuration: this.props.speed + "s"}}>{this.props.children}</div>
        </div>
    );
  }
}