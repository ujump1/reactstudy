import React from "react";
import TemperatureInput from "../../component/Temperature/TemperatureInput";


export default class StateUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            celsiusTemperature:"",
            fahrenheitTemperature:""
        };
        this.afterChangeCelsius = this.afterChangeCelsius.bind(this);
        this.afterChangeFahrenheit = this.afterChangeFahrenheit.bind(this);
        this.toCelsius = this.toCelsius.bind(this);
        this.toFahrenheit = this.toFahrenheit.bind(this);
        this.tryConvert = this.tryConvert.bind(this);
    }

    toCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

    toFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    tryConvert(temperature, convert) {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }

    afterChangeFahrenheit(value){
        console.log("修改了华氏温度"+value);
        const celsiusTemperate = this.tryConvert(value, this.toCelsius)
        this.setState({
            celsiusTemperature: celsiusTemperate,
            fahrenheitTemperature : value
        })
    }

    afterChangeCelsius(value){
        console.log("修改了摄氏温度"+value);
        const fahrenheitTemperate = this.tryConvert(value, this.toFahrenheit)
        this.setState({
            celsiusTemperature: value,
            fahrenheitTemperature: fahrenheitTemperate
        })
    }
    render() {
        return (
            <div>
                <TemperatureInput scaleName="c" temperature= {this.state.celsiusTemperature} onTemperatureChange = {this.afterChangeCelsius}></TemperatureInput>
                <TemperatureInput scaleName="f" temperature= {this.state.fahrenheitTemperature} onTemperatureChange = {this.afterChangeFahrenheit}></TemperatureInput>
            </div>
        )
    }
}

