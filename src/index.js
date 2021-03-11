import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/Store"
import {ThemeContext} from "./context/ThemeContext";


ReactDOM.render(
  <React.StrictMode>
      {/*redux*/}
      <Provider store = {store}>
          {/*context*/}
          <ThemeContext.Provider value="dark">
              <App>
              </App>
          </ThemeContext.Provider>
      </Provider >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
