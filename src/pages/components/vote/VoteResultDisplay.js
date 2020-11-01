import React, {useState, useEffect} from 'react';

const VoteResultDisplay = (props) => {
    
    const {listdata} = props;

    return (
        <div className="result_candidate_wrap">
            <h2>개표결과</h2>
            <div className="result_candidate_list_wrap">
                {listdata.map((candidate, index)=>(
                    <div className="result_candidate_list" key={index}>
                        <div className={"result_candidate_img"}>
                            <img src={candidate.img} alt="선거결과 그래프"></img>
                        </div>
                        <p className={"result_turnout"}><b><span style={candidate.votes === props.winnerVote?{color:"red"}:{color:"blue"}}>{parseFloat(candidate.votePercent).toFixed(1)} %</span> </b> </p>
                        <p><b>기호: <span style={candidate.votes === props.winnerVote?{color:"red"}:{color:"blue"}}>{candidate.number}</span> 번</b></p>
                        <p><b>이름: {candidate.name}</b></p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VoteResultDisplay