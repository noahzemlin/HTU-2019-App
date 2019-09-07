import React from 'react';
import ReturnBar from '../os/ReturnBar';
import { SocketService } from '../../server';
import { Button } from 'react-bootstrap';

interface IProps {
    
}

interface IState {
    socketService: SocketService;
    message: string;
    message2: string;
}

export default class MessageApp extends React.Component<IProps, IState> {
    constructor() {
        super({});

        this.state = {message:"", message2: "", socketService: new SocketService()};
        this.state.socketService.initSocket();
        this.state.socketService.onMessage().subscribe((data) => {
            let newState: IState = this.state;
            if (data.message.endsWith("server")) {
                newState.message2 = data.message;
            } else {
                newState.message = data.message;
            }
            this.setState(newState);
        });
    }
    render() {
        return (
            <div className="imgbg imgbg-message-app">
                <Button variant="primary" onClick={()=>{this.state.socketService.send({message: "test"})}}>Click</Button>
                <Button className = "hidden" variant="primary" onClick={()=>{this.state.socketService.send({message: "yeet"})}}>Click</Button>
                <h1>{this.state.message}</h1>
                <h1>{this.state.message2}</h1>
                <ReturnBar returnTo="/" />
            </div>
        );
    }
}