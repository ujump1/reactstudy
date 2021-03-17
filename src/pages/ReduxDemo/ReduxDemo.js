import * as React from "react";
import {Button, Input} from "antd";
import {connect} from "react-redux";
import {add,sub} from "../../redux/Action";
import {ThemeContext} from "../../context/ThemeContext";

class ReduxDemo extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            addNumber:0
        }
        this.handleBtnClickAdd = this.handleBtnClickAdd.bind(this);
        this.handleBtnClickSub = this.handleBtnClickSub.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static contextType = ThemeContext;
    handleBtnClickAdd() {
        this.props.addAction();  //这是第一种,要使用connect(mapDispatchToProps)绑定，
        //下面是第二种，第二种就不用绑定mapDispatchToProps,要么都用第一种，要么都用第二种
        // const { dispatch } = this.props;  //
        // const action = add(5);
        // dispatch(action);
    }
    handleBtnClickSub() {
        this.props.subAction();  //这是第一种,要使用connect(mapDispatchToProps)绑定，
        // 下面是第二种，第二种就不用绑定mapDispatchToProps 要么都用第一种，要么都用第二种
        console.log(this.props); // 如果用第一种就会把this.props.dispatch映射掉。比如下面的dispatch已经不存在了
        //const { dispatch } = this.props;  //
        // const action = sub(5);
        // dispatch(action);
    }

    handleChange(e){
        this.setState(
            {
                addNumber:e.target.value
            }
        )
    }

    handleAdd(number,e){
        this.props.addNumber(Number.parseInt(number));
    }



    render() {
        console.log(this.context);
        return (
            <div>
                <Button type='primary' onClick={this.handleBtnClickAdd}>自增5</Button>
                <Button type='primary' onClick={()=>this.props.addAction()}>自增5</Button>
                <Button type='primary' onClick={this.handleBtnClickSub}>自减5</Button>
                <div>
                    <Input  style={{width: '135px'}}    onChange={this.handleChange}></Input>
                    {/*这里主要是为了测试传参才这样写的*/}
                    <Button type='primary' onClick={this.handleAdd.bind(this,this.state.addNumber)}>增加</Button>
                    <Button type='primary' onClick={()=>this.handleAdd(this.state.addNumber,this)}>增加</Button>
                </div>
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

//映射Redux actions到组件的属性
const mapDispatchToProps=(dispatch)=>{
    return{
        addAction:()=>dispatch(addAction),
        subAction:()=>dispatch(subAction),
        addNumber:(number) =>dispatch(add(number))
    }
}
// 导出类要修改 或者使用@connect注解
export default connect(mapStateToProps,mapDispatchToProps)(ReduxDemo);
