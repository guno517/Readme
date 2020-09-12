import React, {useState} from "react";
import { HashRouter, Route} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './Main';
const Content = () => {
    return(
        <div style={{marginTop:"50px"}}>
            <Route path="/main" component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
        </div>
    )
}

export default Content;