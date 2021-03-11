import React from "react";

export default class TemperatureInput extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            temperature:"",
            scaleNames:{c: 'Celsius', f: 'Fahrenheit'}
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e){
        console.log("修改了温度"+e.target.value);
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        let scale;
        if(this.props.scaleName === 'c'){
            scale = 'Celsius'
        }else{
            scale = 'Fahrenheit'
        }
        const temperature = this.props.temperature;
        return(
            <div>
                <h2>请输入{scale}温度</h2>
                <input value={temperature} onChange={this.handleChange} ></input>
            </div>
        )
    }
}