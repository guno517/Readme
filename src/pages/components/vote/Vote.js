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
    const voteCandidate = useSelector(state => state.voteCandidate)

    useEffect(()=>{
       dispatch({
           type:'UPDATE_MENU',
           id:2,
           name:"선거"
       })
       //voteHeader 초기화
       dispatch({
            type:'VOTE_UPDATE_MENU',
            id:0
        })
    // select 최초 모든 데이터 fetch
       fetchSelectCode(dispatch);
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
    
    const state = useSelector(state => state.voteMenu)
    return(
        <div className="votecontainer">
            {state[0].isActive ? <img id="NoticePoster" src={VoteInfoPoster} alt="선거 공지 설명 이미지"></img>:""}
            {state[1].isActive ? <img id="NoticePoster" src={VoteCandidatePoster} alt="입후보자 설명 이미지"></img>:""}
            {state[2].isActive ? <img id="NoticePoster" src={VoteResultPoster} alt="선거 공지 설명 이미지"></img>:""}
            <VoteHeader voteMenu={state}></VoteHeader>
            {state[0].isActive ? <VoteInfo/>:""}
            {state[1].isActive ? <VoteCandidate dataDispatch={dataDispatch}/>:""}
            {state[2].isActive ? <VoteResult/>:""}

            {/* <VoteInfo></VoteInfo> */}
        </div>
    )
}

export default Vote;