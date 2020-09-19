import React, {useState} from "react";
import { HashRouter, Route} from "react-router-dom";
import Main from './Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Council from './components/Council';
import Vote from './components/Vote';
import Notice from './components/Notice';

const Content = () => {
    return(
        <div style={{marginTop:"59px"}}>
            <Route exact path="/" component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/council" component={Council}/>
            <Route path="/vote" component={Vote}/>
            <Route path="/notice" component={Notice}/>
        </div>
    )
}
export default Content;