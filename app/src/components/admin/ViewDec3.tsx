import React from 'react';
import HTUServer from '../../services/server';
import { Button } from 'react-bootstrap';

interface IProps {
    onBack: any;
}


export default class ViewDec3 extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);

        HTUServer.get().onEvent("switch-clients-action").subscribe((data: any) => {
            setTimeout(()=>{this.forceUpdate();}, 20);
        });
    }

    handleButtonClick(msg: any) {
        HTUServer.get().send('switch-clients', msg);
    }

    render() {
        return (
            <div>
                <Button disabled={HTUServer.get().android_pos !== 4} onClick={()=>{this.handleButtonClick({group: "Android", pos: 5})}}>Androids Coming</Button>
                <Button disabled={HTUServer.get().android_pos !== 4} onClick={()=>{this.handleButtonClick({group: "Cyborg", pos: 5})}}>Cyborgs Coming</Button>
                <Button onClick={()=>this.props.onBack()}>Back</Button>
            </div>
        );
    }
}