import React from 'react';
import HTUServer from '../../services/server';
import { Button } from 'react-bootstrap';

interface IProps {
    onBack: any;
}


export default class ViewDec3 extends React.Component<IProps, {}> {


    constructor(props: any) {
        super(props);
    }

    handleButtonClick(msg: any) {
        HTUServer.get().send('switch-clients', msg);
    }

    render() {
        return (
            <div>
                <Button onClick={()=>{this.handleButtonClick({group: "Android", pos: 5})}}>Androids Coming</Button>
                <Button onClick={()=>{this.handleButtonClick({group: "Cyborg", pos: 5})}}>Cyborgs Coming</Button>
                <Button onClick={()=>this.props.onBack()}>Back</Button>
            </div>
        );
    }
}