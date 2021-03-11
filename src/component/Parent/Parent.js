import React from 'react'

export default class Parent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
        }
    }

    render() {
        let blueItem;
        let greenItem;
        this.props.children.forEach((item, index) => {
                if (item.props.color === "blue") {
                    blueItem = item;
                } else if (item.props.color === "green") {
                    greenItem = item;
                }
            }
        )
        console.log(blueItem);

        return(
            <div>
                <h1 style = {this.props.style}>{this.props.name}</h1>
                {this.props.children}
                <h1 style = {{color:blueItem.props.color}}> 蓝色 </h1>
                {blueItem}
                <h1 style = {{color:greenItem.props.color}}> 绿色</h1>
                {greenItem}
            </div>
        )
    }
}