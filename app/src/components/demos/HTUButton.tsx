import React from 'react';
import HTUServer from '../../services/server';

interface IProps {
    msg: string;
    speed?: number;
}

interface IState {
  pressed: boolean;
}

export default class HTUButton extends React.Component<IProps, IState> {

  constructor(props:any) {
    super(props);
    this.state = {pressed: false};
  }
  
  handlePress() {
    HTUServer.get().send("message", {data: this.props.msg});
    
    let newState: IState = this.state;
    newState.pressed = true;
    this.setState(newState);
  }

  render() {
    return (
        <div className={this.state.pressed ? "htu-button htu-button-pressed" : "htu-button"} style={{animationDuration: this.props.speed + "s"}} onClick={()=>this.handlePress()}>
            <div style={{animationDuration: this.props.speed + "s"}}>{this.props.children}</div>
        </div>
    );
  }
}