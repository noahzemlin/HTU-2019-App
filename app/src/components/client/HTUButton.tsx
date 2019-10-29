import React from 'react';
import HTUServer from '../../services/server';

interface IProps {
    msg: string;
    speed?: number;
    cstyle?: string;
    wipe?: boolean;
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
    HTUServer.get().send("message", {data: this.props.msg, role: HTUServer.get().getRole()});
    
    let newState: IState = this.state;
    newState.pressed = true;
    this.setState(newState);

    if (this.props.wipe) {
      HTUServer.get().send('finish', {data: HTUServer.get().getRole()});
      HTUServer.get().wipe();
    }
  }

  render() {
    return (
        <div className={(this.state.pressed ? "htu-button htu-button-pressed " : "htu-button ") + this.props.cstyle} style={{animationDuration: this.props.speed + "s"}} onClick={()=>this.handlePress()}>
            <div style={{animationDuration: this.props.speed + "s"}}>{this.props.children}</div>
        </div>
    );
  }
}