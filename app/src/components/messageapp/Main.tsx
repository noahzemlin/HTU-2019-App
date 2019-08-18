import React from 'react';
import ReturnBar from '../os/ReturnBar';
import { SocketService } from '../../server';

interface IProps {
    
}

interface IState {
    socketService: SocketService;
    message: string;
}

export default class MessageApp extends React.Component<IProps, IState> {
    constructor() {
        super({});

        this.state = {message:"", socketService: new SocketService()};
        this.state.socketService.initSocket();
        this.state.socketService.onMessage().subscribe((data) => {this.setState({message: data.message});});
    }
    render() {
        return (
            <div className="imgbg imgbg-message-app">
                <h1>{this.state.message}</h1>
                <button onClick={()=>{this.state.socketService.send({message: "test"})}}>Click</button>
                <ReturnBar returnTo="/" />
            </div>
        );
    }
}