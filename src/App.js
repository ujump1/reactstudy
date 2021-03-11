import * as React from "react";
import {HashRouter as Router,Link,Route} from "react-router-dom";
import Game from "./pages/Game/Game";
import Slot from "./pages/Slot/Slot";
import StateUp from "./pages/StateUp/StateUp";
import AjaxDemo from "./pages/Ajax/AjaxDemo";
import  './App.css';
import ReduxDemo from "./pages/ReduxDemo/ReduxDemo";
import ReduxDemoSubscribe from "./pages/ReduxDemo/ReduxDemoSubscribe";
import Theme from "./pages/Context/Theme";

class App extends React.Component{

  render() {
      return (
              <div id="app">
                  <div> 路由 </div>
                  {/*可以有多个Router,设置baseName里面的都会自动加上*/}
                  <Router basename="/admin">
                      <div>
                          <Link to="/"> 游戏 </Link>
                          <Link to="/slot"> 插槽 </Link>
                          <Link to="/stateUp"> 状态提升 </Link>
                          <Link to="/ajax"> ajax </Link>
                          <Link to="/reduxDemo"> reduxDemo </Link>
                          <Link to="/reduxDemoSubscribe"> reduxDemoSubscribe </Link>
                          <Link to="/context"> context </Link>
                      </div>
                      <Route path="/" exact component={Game}></Route>
                      <Route path="/slot" component={Slot}></Route>
                      <Route path="/stateUp" component={StateUp}></Route>
                      <Route path="/ajax" component={AjaxDemo}></Route>
                      <Route path="/reduxDemo" component={ReduxDemo}></Route>
                      <Route path="/reduxDemoSubscribe" component={ReduxDemoSubscribe}></Route>
                      <Route path="/context" component={Theme}></Route>
                  </Router>

              </div>
      )
  }
}

export default App;
