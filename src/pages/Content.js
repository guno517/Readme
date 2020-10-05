import React from "react";
import { HashRouter, Route} from "react-router-dom";
import Main from './Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Council from './components/Council';
import Vote from './components/Vote';
import Search from './components/Search';
import Notice from './components/Notice';
import NoticeEditor from './components/NoticeEditor'

const Content = () => {

    return(
        <div style={{marginTop:"59px"}}>
            <Route exact path="/" component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/search" component={Search}/>
            <Route path="/council" component={Council}/>
            <Route path="/vote" component={Vote}/>
            <Route path="/notice" component={Notice}/>
            <Route path="/editor" component={NoticeEditor}/>
        </div>
    )
}
export default Content;