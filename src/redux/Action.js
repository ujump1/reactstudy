
export const ADD = 'ADD';
export const SUB = 'SUB';

export function add(text){
    return{
        type:ADD,
        addNumber:text
    }
}
export function sub(text){
    return{
        type:SUB,
        subNumber:text
    }
}