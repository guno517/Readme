import React, {useState, useEffect} from "react";
import {useSelector, useDispatch } from 'react-redux'
import VoteHeader from "./VoteHeader";
import VoteInfo from "./VoteInfo";
import VoteCandidate from "./VoteCandidate";
import VoteResult from "./VoteResult";
import { fetchSelectCode } from "../Common";
import "../css/Vote.css";
import "../css/HeaderPoster.css";

const VoteInfoPoster = require("../../../img/VoteNotice.png");
const VoteCandidatePoster = require("../../../img/CandidateList.png")
const VoteResultPoster = require("../../../img/CandidateResult.png")

const Vote = (props) => {

    const dispatch = useDispatch()
    const voteCandidate = useSelector(state => state.voteData)
    const voteResult = useSelector(state => state.voteData)
    const voteTurnOut = useSelector(state => state.voteTurnOut)
    const [elected ,setElected] = useState({votes:0})
    
    const [authority, setAuthority] = useState('')
    let winnerVotes = 0;

    useEffect(()=>{
       dispatch({
           type:'UPDATE_MENU',
           id:2,
           name:"선거"
       })
       //voteHeader 초기화
       dispatch({
            type:'VOTE_UPDATE_MENU',
            id:1
        })
    // select 최초 모든 데이터 fetch
       fetchSelectCode(dispatch);
        setAuthority(window.sessionStorage.getItem("authority"));
    },[])
    
    //select 박스 변경시
    const dataDispatch = (college, major) =>{
        let voteCandidateCollege = voteCandidate.candidate.filter(f => {
            return f.collegeId === college && f.deptId===major
        });
            dispatch({
                type:'FETCH_CANDIDATE_DATA_COLLEGE',
                data:voteCandidateCollege,
            })
    }

    const resultDataDispatch = (college, major) =>{
        let voteResultCollege = voteResult.vote_result.filter(f => {
            return f.collegeId === college && f.deptId===major
        });
        let voteTurnOutCollege = voteTurnOut.participation.filter(f => {
            return f.collegeId === college && f.deptId===major
        });
        dispatch({
                type:'FETCH_RESULT_DATA_COLLEGE',
                data:voteResultCollege,
            })
        
        dispatch({
            type:'FETCH_TURNOUT_DATA_COLLEGE',
            data:voteTurnOutCollege,
        })

          // 투표 이긴 사람의 정보를 알아서 style 수정하기위해
          for(let i = 0; i<voteResultCollege.length; i++){
                if(winnerVotes < voteResultCollege[i].votes){
                    winnerVotes = voteResultCollege[i].votes;
                }
        }
        setElected({votes:winnerVotes})
    }
  
    const state = useSelector(state => state.voteMenu)
    return(
        <div className="votecontainer">
            {state[0].isActive ? <img id="NoticePoster" src={VoteInfoPoster} alt="선거 공지 설명 이미지"></img>:""}
            {state[1].isActive ? <img id="NoticePoster" src={VoteCandidatePoster} alt="입후보자 설명 이미지"></img>:""}
            {state[2].isActive ? <img id="NoticePoster" src={VoteResultPoster} alt="선거 공지 설명 이미지"></img>:""}
            <VoteHeader voteMenu={state}></VoteHeader>
            {state[0].isActive ? <VoteInfo/>:""}
            {state[1].isActive ? <VoteCandidate dataDispatch={dataDispatch} authority={authority}/>:""}
            {state[2].isActive ? <VoteResult dataDispatch={resultDataDispatch} authority={authority} winnerVotes={elected.votes}/>:""}

            {/* <VoteInfo></VoteInfo> */}
        </div>
    )
}

export default Vote;