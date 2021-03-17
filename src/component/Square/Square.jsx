import React from 'react'
import './Square.css'
import {Button} from "antd";


export default class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           value : null,
        };
    }

    render() {
        return(
          <Button className="square" style={{padding:0}} onClick={() => this.props.onClick("x")}><span>{this.props.value}</span>
          </Button>
        )
    }

}