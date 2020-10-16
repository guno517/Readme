import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import SelectCollege from "../SelectCollege";
import CandidateList from "./CandidateList";
// import { fetchApiGet } from "../Common";

const VoteCandidate = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const { dataDispatch } = props;
    const dispatch = useDispatch();
    // const [fetchData, setFetchData] = useState('')

    // candidate 데이터 get
    const fetchApiGet = async(ApiUrl) => {
        const response = await fetch(ApiUrl)
        .then(async(response)=>{
            if(response.ok){
                const response_json = await response.json();
                return response_json;
            }else{
                throw new Error('Something went wrong');
            }
        })
        .then((data)=>{
            dispatch({
                type:'FETCH_CANDIDATE_DATA_ALL',
                data:data
            })
            setIsLoading(true)

        })
        .catch((error) => {
            console.log(error)
        });
    }
   
    // selected 된 데이터 store에서 가져오기
    const voteCandidateData = useSelector(state => state.voteCandidateCollege)
    
    useEffect(()=>{
        let ApiUrl = 'http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/candidate';
        fetchApiGet(ApiUrl)
    },[])
    useEffect(()=>{
        isLoading && dataDispatch(0,0)
    },[isLoading])

    return(
        <div className={"VoteCandidate"}>
            <SelectCollege dataDispatch={dataDispatch}></SelectCollege>
            <CandidateList listdata={voteCandidateData} sessionId={props.sessionId}></CandidateList>
        </div>
    )
}

export default VoteCandidate
