import React, {useState, useEffect} from 'react';

const VoteResultDisplay = (props) => {

    const [elected ,setElected] = useState({votes:0})
    const {listdata} = props;
    
    useEffect(()=>{
        // 투표 이긴 사람의 정보를 알아서 style 수정하기위해
        for(let i = 0; i<listdata.length; i++){
            if(elected.votes < listdata[i].votes){
                setElected(listdata[i])
            }
        }
    })
    return (
        <div className="result_candidate_wrap">
            <h2>개표결과</h2>
            <div className="result_candidate_list_wrap">
                {listdata.map((candidate, index)=>(
                    <div className="result_candidate_list" key={index}>
                        <div className={"result_candidate_img"}>
                            <img src={candidate.img} alt="선거결과 그래프"></img>
                        </div>
                        <p className={"result_turnout"}><b><span style={candidate.number === elected.number?{color:"red"}:{color:"blue"}}>{parseFloat(candidate.votePercent).toFixed(1)} %</span> </b> </p>
                        <p><b>기호: <span style={candidate.number === elected.number?{color:"red"}:{color:"blue"}}>{candidate.number}</span> 번</b></p>
                        <p><b>이름: {candidate.name}</b></p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VoteResultDisplay