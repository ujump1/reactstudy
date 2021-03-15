import {applyMiddleware,createStore} from "redux"

import myReducers from "./Reducer";
import thunk from "_redux-thunk@2.3.0@redux-thunk";

let store = createStore(myReducers,applyMiddleware(thunk))

export default store;