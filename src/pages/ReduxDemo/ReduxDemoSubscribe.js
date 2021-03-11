import * as React from "react";
import {Button} from "antd";
import {connect} from "react-redux";
import {add,sub} from "../../redux/Action";
import store from "../../redux/Store";
class ReduxDemoSubscribe extends React.Component{

    constructor(props) {
        super(props);
        this.handleBtnClickAdd = this.handleBtnClickAdd.bind(this);
        this.handleBtnClickSub = this.handleBtnClickSub.bind(this);
    }


    handleBtnClickAdd() {
        //this.props.addAction();  //这是第一种,要使用connect(mapDispatchToProps)绑定，
        //下面是第二种，第二种就不用绑定mapDispatchToProps,要么都用第一种，要么都用第二种
        console.log(this.props);
        const { dispatch } = this.props;  //

        const action = add(5);
        dispatch(action);
    }
    handleBtnClickSub() {
        // 点击减法解除监听
        unsubscribe();
        //this.props.subAction();  //这是第一种,要使用connect(mapDispatchToProps)绑定，
        // 下面是第二种，第二种就不用绑定mapDispatchToProps 要么都用第一种，要么都用第二种
        console.log(this.props); // 如果用第一种就会把this.props.dispatch映射掉。这里不会
        const { dispatch } = this.props;  //
        const action = sub(5);
        dispatch(action);
    }



    render() {
        return (

            <div>
                <Button type='primary' onClick={this.handleBtnClickAdd}>自增5</Button>
                <Button type='primary' onClick={this.handleBtnClickSub}>自减5</Button>
                <p>当前数字{this.props.number}</p>
            </div>
        )
    }

}


// 增加监听功能
const log=()=>{
    console.log(store.getState())
}

const unsubscribe =store.subscribe(log)



//映射Redux state到组件的属性
const mapStateToProps = (state) => {
    return {
        number: state.calculate.number
    };
};

// const addAction = add(5);
//
// const subAction = sub(5);

//映射Redux actions到组件的属性
// const mapDispatchToProps=(dispatch)=>{
//     return{
//         addAction:()=>dispatch(addAction),
//         subAction:()=>dispatch(subAction)
//     }
// }

// 导出类要修改 或者使用@connect注解);
export default connect(mapStateToProps)(ReduxDemoSubscribe);
