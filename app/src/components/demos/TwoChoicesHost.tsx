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

        HTUServer.get().onEvent("message").subscribe((data) => {
            let newState: IState = this.state;
            newState.message = data.data;
            newState.cname = "";
            this.setState(newState);
            setTimeout(() => {newState.cname = "two-choices-response"; this.setState(newState);}, 20);
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