import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import Profile from "./Profile"
import CandidatePledge from "./CandidatePledge"

const CandidateList = (props) => {
    const {listdata, authority} = props;
    console.log(authority)
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

    let collegeCode = useSelector(state=>state.selectFlagData.college)
    let majorCode = useSelector(state=>state.selectFlagData.major)

    pledgeData = useSelector(state=>state.votePledge); 

    return (
    <div className={"candidate_container"}>
        <Profile listdata={listdata} onClick={ClickProfile} authority={authority}></Profile>
        {listdata.length !==0 
            ? <CandidatePledge pledgeData={pledgeData}></CandidatePledge>
            : <p>등록된 후보가 없습니다.</p>
        }
        <div className={"candidate_setting"}>
        {authority === "0" &&
            <button type="button"><Link to={`/candidateSet/${collegeCode}/${majorCode}`}>후보자 관리</Link></button>
        }
        </div>
    </div>
    )
}

export default CandidateList
