import {createStore} from "redux"

import todoApp from "./Reducer";

let store = createStore(todoApp)

export default store;