import React from 'react'
import CandidatePledge from "./CandidatePledge"

const CandidateList = (props) => {
    const {listdata} = props;
    return (
    <div className={"candidate_container"}>
        <div className={"candidate_list_container"}>
            {listdata.map((candidate)=>(
                <div className={"candidate_list"}>
                    <div className={"candidate_profile"}>
                        <img src={candidate.img} alt="candidate"></img>
                        <dl>
                            <dt style={{marginLeft:'10px'}}>기호: <span style={{color:'red', fontWeight:600}}>{candidate.number}</span> 번 </dt>
                            <dt style={{marginLeft:'10px'}}>이름: <span style={{color:'blue'}}>{candidate.name}</span></dt>
                        </dl>
                    </div>
                </div>
            ))}
        </div>
        <CandidatePledge></CandidatePledge>
    </div>
    )
}

export default CandidateList
