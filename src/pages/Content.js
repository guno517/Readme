import React from "react";
import { HashRouter, Route} from "react-router-dom";
import Main from './Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Council from './components/council/Council';
import Vote from './components/vote/Vote';
import Search from './components/Search';
import Notice from './components/notice/Notice';
import NoticeEditor from './components/notice/NoticeEditor';
import NoticeDetail from './components/notice/NoticeDetail';
import CandidateSet from './components/vote/CandidateSet';

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
            <Route exact path="/editor" component={NoticeEditor}/>
            <Route exact path="/editor/update/:id" component={NoticeEditor}/>
            <Route path="/notice_detail/:id" component={NoticeDetail}/>
            <Route path="/candidateSet/:collegeCode/:majorCode" component={CandidateSet}/>
        </div>
    )
}
export default Content;