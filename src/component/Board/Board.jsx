import React from 'react'
import Square from "../Square/Square";
import './Board.css'


export default class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares : Array(36).fill(null),
        };
    }

    handClick(i) {
        const squares = this.state.squares;
        squares[i] = 'X';
        this.setState({squares : squares});
    }
    renderSquare(i){
        return <Square value = {this.state.squares[i]}
                       onClick = {()=>this.handClick(i)}
        />;
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
                    {this.renderSquare(36)}
                </div>
            </div>
        )
    }

}