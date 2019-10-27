import React from 'react';
import HTUServer from '../../services/server';
import { Button } from 'react-bootstrap';

interface IProps {
    onBack: any;
}

interface IState {
    message: string;
    cname: string;
}

export default class ViewDec1 extends React.Component<IProps, IState> {


    constructor(props: any) {
        super(props);

        this.state = {message: "", cname:"two-choices-response"};

        HTUServer.get().onEvent("message").subscribe((data) => {
            if (data.data === "1" || data.data === "2") {
                let newState: IState = this.state;
                newState.message = data.data;
                newState.cname = "";
                this.setState(newState);
                setTimeout(() => {newState.cname = "two-choices-response"; this.setState(newState);}, 20);
            }
        });
    }

    handleButtonClick(msg: any) {
        HTUServer.get().send('switch-clients', msg);
    }

    render() {
        return (
            <div>
                <Button onClick={()=>{this.handleButtonClick({group: "Android", pos: 1})}}>Androids Coming</Button>
                <Button onClick={()=>{this.handleButtonClick({group: "Cyborg", pos: 1})}}>Cyborgs Coming</Button>
                <Button onClick={()=>this.props.onBack()}>Back</Button>
                <div className={this.state.cname}>
                    {this.state.message}
                    <br />
                </div>
            </div>
        );
    }
}