import {combineReducers} from "redux";
import {ADD,SUB} from "./Action";

const count = {
    number:10
};
function calculate(state = count,action){
    console.log(state);
    console.log(action);
    switch (action.type){
        case ADD:
            return {
                ...state,
                number:state.number+action.addNumber
            }
        case SUB:
            return {
                ...state,
                number:state.number-action.subNumber
            }
        default:
            return state;
    }
}

const todoApp =combineReducers({
    calculate
})

export default todoApp;
