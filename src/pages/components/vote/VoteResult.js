import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import VoteResultDisplay from "./VoteResultDisplay";
import SelectCollege from "../SelectCollege";

const VoteResult = (props) => {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()
    const { dataDispatch } = props;
    const voteResultData = useSelector(state => state.voteDataCollege)
    // VoteResult 데이터 get
    const fetchApiGet = async(ApiUrl) => {
        const response = await fetch(ApiUrl)
        let voteResult = await response.json();
        dispatch({
            type:'FETCH_VOTE_RESULT_DATA_ALL',
            data:voteResult
        })
        setIsLoading(true)
    }

    useEffect(()=>{
        let ApiUrl = 'http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/vote/result';
        fetchApiGet(ApiUrl)
    },[])
    useEffect(()=>{
        isLoading && dataDispatch(0,0)
    },[isLoading])

    return (
        <div className={"VoteResult"}>
            <SelectCollege dataDispatch={dataDispatch}></SelectCollege>
            <VoteResultDisplay listdata={voteResultData} ></VoteResultDisplay>
        </div>
    )
}

export default VoteResult
