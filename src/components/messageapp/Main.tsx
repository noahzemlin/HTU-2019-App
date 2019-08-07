import React from 'react';
import ReturnBar from '../os/ReturnBar';

interface IProps {
    
}

export default class MessageApp extends React.Component<IProps, {}> {
    render() {
        return (
            <div className="imgbg imgbg-message-app">
                <h1>Hi!</h1>
                <ReturnBar returnTo="/" />
            </div>
        );
    }
}