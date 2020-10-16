import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';

const Profile = (props) => {
    const dispatch = useDispatch()

    const {listdata, onClick, sessionId} = props
    
    const removeProfile = async(id) =>{
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/candidate/delete/${id}`,{
            method:'get',
        })
        .then(()=>{
            dispatch({
                type:"FETCH_CANDIDATE_DATA_COLLEGE",
                data:listdata.filter(f=>{
                    return f.index !== id 
                }),
                    
            })
        })
    }
    return (
        <div className={"candidate_list_container"}>
            {listdata.map((candidate, index)=>(
                <div className={"candidate_list"} key={index}>
                    <div className={"candidate_profile"} onClick={()=>onClick(candidate.number)}>
                        {sessionId === "admin" && 
                        <button 
                        onClick={()=>removeProfile(candidate.index)}
                        style={{
                            position: 'absolute',
                            background:'white',
                            border: '1px solid #cccccc',
                            width: '25px',
                            height: '25px',
                        }}>
                            x
                        </button>}
                        <img src={candidate.img} alt="candidate"></img>
                        <dl>
                            <dt style={{marginLeft:'10px'}}>기호: <span style={{color:'red', fontWeight:600}}>{candidate.number}</span> 번 </dt>
                            <dt style={{marginLeft:'10px'}}>이름: <span style={{color:'blue'}}>{candidate.name}</span></dt>
                        </dl>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Profile
