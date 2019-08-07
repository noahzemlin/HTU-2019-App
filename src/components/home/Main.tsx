import React from 'react';
import AppGrid from './AppGrid';
import IApp from '../../interfaces/IApp';

interface IProps {
}

interface IState {
    apps: IApp[];
}

export default class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            apps: [
                {
                    path: "/message/",
                    name: "Message",
                    icon_path: "favicon.ico",
                }
            ]
        };
    }
    render() {
        return (
            <div className="imgbg imgbg-home">
                <AppGrid apps={this.state.apps}/>
            </div>
        );
    }
}