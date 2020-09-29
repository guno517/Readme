import React, {useState, useEffect} from "react";
import {useSelector, useDispatch } from 'react-redux'
import VoteHeader from "./VoteHeader";
import VoteInfo from "./VoteInfo";
import VoteCandidate from "./VoteCandidate";
import VoteResult from "./VoteResult";

const Vote = (props) => {
    const dispatch = useDispatch()

    useEffect(()=>{
       dispatch({
           type:'UPDATE_MENU',
           id:2,
           name:"선거"
       })
    })

    const state = useSelector(state => state.vote)
    return(
        <div>
            <VoteHeader voteMenu={state}></VoteHeader>
            {state[0].isActive ? <VoteInfo/>:""}
            {state[1].isActive ? <VoteCandidate/>:""}
            {state[2].isActive ? <VoteResult/>:""}

            {/* <VoteInfo></VoteInfo> */}
        </div>
    )
}

export default Vote;