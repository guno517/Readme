import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import VoteResultDisplay from "./VoteResultDisplay";
import VoteResultChart from "./VoteResultChart";
import VoteResultTurnoutChart from "./VoteResultTurnoutChart";
import SelectCollege from "../SelectCollege";
import { Link } from "react-router-dom";

const VoteResult = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const dispatch = useDispatch()
    const { dataDispatch, authority } = props;
    const voteResultData = useSelector(state => state.voteDataCollege)
    const voteTurnOutCollege = useSelector(state => state.voteTurnOutCollege)
    
    // VoteResult 데이터 get
    const fetchApiGetResult = async(ApiUrl) => {
        const response = await fetch(ApiUrl)
        let voteResult = await response.json();
        dispatch({
            type:'FETCH_VOTE_RESULT_DATA_ALL',
            data:voteResult
        })
        setIsLoading(true)
    }
    const fetchApiGetTurnout = async(ApiUrl) => {
        const response = await fetch(ApiUrl)
        let voteTurnOut = await response.json();
        dispatch({
            type:'FETCH_VOTE_TURNOUT_DATA_ALL',
            data:voteTurnOut
        })
        setIsLoading2(true)

    }

    useEffect(()=>{
        let ApiUrlResult = 'http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/vote/result';
        let ApiUrlTurnOut = 'http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/vote/participation';
        fetchApiGetResult(ApiUrlResult)
        fetchApiGetTurnout(ApiUrlTurnOut)
    },[])
    
    useEffect(()=>{
        isLoading && isLoading2 && dataDispatch(0,0)
    },[isLoading && isLoading2])
    
    

    return (
        <div className={"VoteResult"}>
            <SelectCollege dataDispatch={dataDispatch}></SelectCollege>
            <div style={{marginTop:"5%"}}>
                {voteResultData.length !== 0 ?
                <div>
                    <VoteResultDisplay listdata={voteResultData} winnerVote={props.winnerVotes}></VoteResultDisplay>
                    <VoteResultChart listdata={voteResultData}></VoteResultChart>
                </div>
                : <p>등록된 데이터가 없습니다.</p>
                }
                 {voteTurnOutCollege.length !== 0 &&
                    <VoteResultTurnoutChart listdata={voteTurnOutCollege}></VoteResultTurnoutChart>
                 }
                {authority === "0" &&
                    <button type="button"><Link to={`/voteAdmin`}>결과 관리</Link></button>
                }

            </div>
        </div>
    )
}
            // {voteResultData.length !== 0  && <VoteResultDisplay listdata={voteResultData} ></VoteResultDisplay>}

export default VoteResult
