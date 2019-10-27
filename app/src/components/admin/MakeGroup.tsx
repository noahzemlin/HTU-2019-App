import React from 'react';
import HTUServer from '../../services/server';
import { Row, Col, Form, Button } from 'react-bootstrap';

interface IProps {
    onBack: any;
}

interface IState {
    message: string;
}

export default class MakeGroup extends React.Component<IProps, IState> {

    public value: string = "";


    constructor(props: any) {
        super(props);

        this.state = {message: ""};

        HTUServer.get().onEvent("make-group-response").subscribe((data) => {
            let newState: IState = this.state;
            newState.message = data.data;
            this.setState(newState);
        });
    }

    handlePress() {
        HTUServer.get().send("make-group", {data: this.value})
    }

    handleChange(e: any) {
        this.value = e.target.id;
    }

    render() {
        return (
            <div style={{textAlign:  "center", fontSize: "1.5em"}}>
                <h1>New Group Creation</h1>
                <Button onClick={()=>this.props.onBack()}>Back</Button>
                <Form>
                    <fieldset>
                        <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Check
                            type="radio"
                            label="Android Attack"
                            name="formRadios"
                            id="Android"
                            onChange={(e: any)=>{this.handleChange(e)}}
                            />
                            <Form.Check
                            type="radio"
                            label="Cyborg Cemetry (ADA)"
                            name="formRadios"
                            id="Cyborg"
                            onChange={(e: any)=>{this.handleChange(e)}}
                            />
                            <Form.Check
                            type="radio"
                            label="Admin"
                            name="formRadios"
                            id="Admin"
                            onChange={(e: any)=>{this.handleChange(e)}}
                            />
                        </Col>
                        </Form.Group>
                    </fieldset>
                </Form>
                <Button onClick={()=>{this.handlePress()}}>Create</Button>
                <h1>{this.state.message}</h1>
            </div>
        );
    }
}