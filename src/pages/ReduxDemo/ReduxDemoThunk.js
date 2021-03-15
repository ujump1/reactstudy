import * as React from "react";
import {Button} from "antd";
import {add, sub} from "../../redux/Action";
import {connect} from "react-redux";
import store from "../../redux/Store";


class reduxDemoThunk extends React.Component{
    constructor(props) {
        super(props);
    }



    render() {
        console.log(this.context);
        return (
            <div>
                <Button type='primary' onClick={this.props.addActionSync.bind(this,this.props,5)}>自增5</Button>
                <Button type='primary' onClick={this.props.subActionSync.bind(this,5)}>自减5</Button>
                <p>当前数字{this.props.number}</p>
            </div>
        )
    }

}

//映射Redux state到组件的属性
const mapStateToProps = (state) => {
    return {
        number: state.calculate.number
    };
};

const addAction = add(5);

const subAction = sub(5)

const addActionSync = (props,number)=> dispatch => {
    // 这里可以做其他操作，或者异步获取数据
    console.log(props);
    console.log(number);
    // 最后调用dispatch
    dispatch(add(number))
}
const subActionSync = (number)=> dispatch => {
    console.log(number);
    dispatch(sub(number))
}


//映射Redux actions到组件的属性
const mapDispatchToProps=(dispatch)=>{
    return{
        // 添加了redux-thunk中间件后，action可以是一个function
        // 这里可以传自定义参数
        addActionSync:(props,number)=>dispatch(addActionSync(props,number)),
        subActionSync:(number)=>dispatch(subActionSync(number))
    }
}
// 导出类要修改 或者使用@connect注解
export default connect(mapStateToProps,mapDispatchToProps)(reduxDemoThunk);