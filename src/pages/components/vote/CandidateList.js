import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import Profile from "./Profile"
import CandidatePledge from "./CandidatePledge"

const CandidateList = (props) => {
    const {listdata} = props;
    // 프로필 클릭시 event
    
    const dispatch = useDispatch();  

    let pledge = listdata[0];
    let pledgeData; 
    
    const ClickProfile = (number) =>{
        pledge = listdata.filter(f=>{
            return f.number===number
        })
        dispatch({
            type:"PLEDGE_CHANGE_DATA",
            data:pledge[0]
        })
    }

    useEffect(()=>{
       if(pledge !== undefined){
            dispatch({
                type:"PLEDGE_CHANGE_DATA",
                data:pledge
            })
       }
    },[pledge])
    pledgeData = useSelector(state=>state.votePledge); 

    return (
    <div className={"candidate_container"}>
        <Profile listdata={listdata} onClick={ClickProfile}></Profile>
        {listdata.length !==0 && 
            <CandidatePledge pledgeData={pledgeData}></CandidatePledge>
        }
        <div className={"candidate_setting"}>
            <button type="button">후보자 관리</button>
        </div>
    </div>
    )
}

export default CandidateList
