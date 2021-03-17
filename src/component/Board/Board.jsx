import React from 'react'
import Square from "../Square/Square";
import './Board.css'
import {Button, Modal} from "antd";


export default class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            size:6,
            squares : Array(36).fill(""),
            lastIndex:'',
            thisPlayer:'✔',
            nextPlayer:'●',
            lastPosition:null,
            gameOver:false
        };
    }

    checkWin(i){
        // 判断是否有五个
        const squares = this.state.squares;
        const size = this.state.size;
        // 判断棋盘上四周的最大个数且小于等于4
        const left = (i - (Math.trunc(i/size)*size)) >4 ? 4: (i - (Math.trunc(i/size)*size)) ;
        const right =  (((Math.trunc(i/size))+1)*size - i -1) >4 ? 4:(((Math.trunc(i/size))+1)*size - i -1) ;
        const top =  (Math.trunc(i/size)) >4 ? 4: Math.trunc(i/size) ;
        const bottom = (size - Math.trunc(i/size) -1 )>4 ? 4:(size - Math.trunc(i/size) -1 ) ;
        // 判断四周相同的个数
        let sameLeft = 0;
        let sameRight = 0;
        let sameTop = 0;
        let sameBottom = 0;
        for(let j =1;j<=left;j++){
            if(squares[i-j] === this.state.nextPlayer){
                sameLeft ++;
            }else{
                break
            }
        }
        for(let j =1;j<=right;j++){
            if(squares[i+j] === this.state.nextPlayer){
                sameRight ++;
            }else{
                break
            }
        }
        for(let j =1;j<=top;j++){
            if(squares[i-j*this.state.size] === this.state.nextPlayer){
                sameTop ++;
            }else{
                break
            }
        }
        for(let j =1;j<=bottom;j++){
            if(squares[i+j*this.state.size] === this.state.nextPlayer){
                sameBottom ++;
            }else{
                break
            }
        }
        console.log(bottom);
        console.log(sameBottom);
        if(sameRight + sameLeft >=4 || sameTop+sameBottom>=4){
            Modal.info({
                title: "通知",
                content: "游戏结束。winner:"+this.state.nextPlayer
            });
            this.setState({
                gameOver:true
            });
        }
    }

    handClick(i) {
        const squares = this.state.squares;
        if (squares[i] === "" && !this.state.gameOver) {
            squares[i] = this.state.nextPlayer;
            const nextPlayer = this.state.nextPlayer === "●" ? "×" : "●"
            const thisPlayer = this.state.thisPlayer === "●" ? "×" : "●"
            this.setState({
                squares: squares,
                nextPlayer: nextPlayer,
                thisPlayer:thisPlayer,
                lastPosition:i
            });
            this.checkWin(i);
        }
    }
    cancel(){
        if(this.state.lastPosition !=null && !this.state.gameOver){
            const squares = this.state.squares;
            squares[this.state.lastPosition]="";
            const nextPlayer = this.state.nextPlayer === "●" ? "×" : "●"
            const thisPlayer = this.state.thisPlayer === "●" ? "×" : "●"
            this.setState({
                squares:squares,
                lastPosition:null,
                nextPlayer: nextPlayer,
                thisPlayer:thisPlayer
            })
        }else {
            if (this.state.gameOver) {
                Modal.info({
                    title: "警告",
                    content: "游戏已经结束!"
                })
            } else {
                Modal.info({
                    title: "警告",
                    content: "只能后退一步棋哟！"
                })
            }
        }
    }

    restart(){
        this.setState({
                size: 6,
                squares: Array(36).fill(""),
                lastIndex: '',
                thisPlayer: '✔',
                nextPlayer: '●',
                lastPosition: null,
                gameOver: false
        })
    }
    renderSquare(i){
        return <Square value = {this.state.squares[i]}
                       onClick = {()=>this.handClick(i)}
        />;
        {/* 如果想在子组件中回传参数的话，可以用这种方式                onClick = {(value)=>this.handClick(value)}*/}
    }
    render() {
        return(
            <div>
                <div className="status"> 五子棋大战 </div>
                <div className= "board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className= "board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
                <div className= "board-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                </div>
                <div className= "board-row">
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                    {this.renderSquare(20)}
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                </div>
                <div className= "board-row">
                    {this.renderSquare(24)}
                    {this.renderSquare(25)}
                    {this.renderSquare(26)}
                    {this.renderSquare(27)}
                    {this.renderSquare(28)}
                    {this.renderSquare(29)}
                </div>
                <div className= "board-row">
                    {this.renderSquare(30)}
                    {this.renderSquare(31)}
                    {this.renderSquare(32)}
                    {this.renderSquare(33)}
                    {this.renderSquare(34)}
                    {this.renderSquare(35)}
                </div>
                <div>
                    <Button type="primary" className = "back" onClick={()=>this.cancel()}>悔棋</Button>
                    <Button type="primary" className = "back" onClick={()=>this.restart()}>重新开始</Button>
                </div>
            </div>
        )
    }

}