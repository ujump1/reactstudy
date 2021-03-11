import React from 'react'
import Board from "../../component/Board/Board";
import  './Game.css';


export default class Game extends React.Component{
    constructor() {
        super();
    }

    render() {
        return(
            <div className= "game">
                <div className= "game-board">
                    <Board/>
                </div>
            </div>
        )
    }
}