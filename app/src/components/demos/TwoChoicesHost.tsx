import React from 'react';
import HTUServer from '../../services/server';

interface IProps {
}

interface IState {
    message: string;
    cname: string;
}

export default class TwoChoicesHost extends React.Component<IProps, IState> {


    constructor(props: any) {
        super(props);

        this.state = {message: "", cname:"two-choices-response"};

        HTUServer.get().onMessage().subscribe((data) => {
            let newState: IState = this.state;
            if (data.type === 1) {
                newState.message = data.data;
            }
            newState.cname = "";
            this.setState(newState);
            newState.cname = "two-choices-response";
            this.setState(newState);
        });
    }

    render() {
        return (
            <div className={this.state.cname}>
                {this.state.message}
            </div>
        );
    }
}