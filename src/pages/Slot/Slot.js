import React from 'react'
import Parent from "../../component/Parent/Parent";

export default class Slot extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            color:["blue","green"]
        }
    }

    render() {
        return(
            <div>
                {/*在Parent和>之间可以传参给Parent*/}
                <Parent name="插槽" style = {{color:'blue'}}>
                    {/*在Parent中的props.children就是 下面这两个h2*/}
                    <h2 color = {this.state.color[0]}> 蓝色插槽 </h2>
                    <h2 color = {this.state.color[1]}> 绿色插槽 </h2>
                </Parent>
            </div>
        )
    }
}