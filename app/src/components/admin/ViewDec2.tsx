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

export default class ViewDec2 extends React.Component<IProps, IState> {

    private android_pos: number = 0;
    private cyborg_pos: number = 0;

    constructor(props: any) {
        super(props);

        this.state = {message: "", cname:"two-choices-response"};

        HTUServer.get().onEvent("message").subscribe((data) => {
            if (data.data === "gold" || data.data === "silver") {
                let newState: IState = this.state;
                newState.message = data.data;
                newState.cname = "";
                this.setState(newState);
                setTimeout(() => {newState.cname = "two-choices-response"; this.setState(newState);}, 20);
            }
        });

        HTUServer.get().onEvent("switch-clients-action").subscribe((data: any) => {
            this.android_pos = data.android_pos;
            this.cyborg_pos = data.cyborg_pos;
        });
    }

    handleButtonClick(msg: any) {
        HTUServer.get().send('switch-clients', msg);
    }

    render() {
        return (
            <div>
                <Button disabled={this.android_pos !== 2} onClick={()=>{this.handleButtonClick({group: "Android", pos: 3})}}>Androids Coming</Button>
                <Button disabled={this.cyborg_pos !== 2} onClick={()=>{this.handleButtonClick({group: "Cyborg", pos: 3})}}>Cyborgs Coming</Button>
                <Button onClick={()=>this.props.onBack()}>Back</Button>
                <div className={this.state.cname}>
                    {this.state.message}
                    <br />
                </div>
            </div>
        );
    }
}