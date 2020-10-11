import React, {useState, useEffect} from 'react';

const CandidatePledge = (props) => {
    const {pledgeData} = props;
    const [pledge, setPledge] = useState(); 
    const [isLoading, setIsLoading] = useState(false); 
    const [career, setCareer] = useState(); 
    const [electionPledge, setElectionPledge] = useState(); 
    useEffect(()=>{
        setPledge(pledgeData)
    })
    
    useEffect(()=>{
        if(pledge !== undefined && pledge.length !== 0){
            setIsLoading(true)
            setCareer(pledge.career.substr(0,pledge.career.length-1).split("#",-1))
            setElectionPledge(pledge.election_pledge.substr(0,pledge.election_pledge.length-1).split("#"))
        }
    },[pledge])
    return (
        <div className={"candidate_pledge_container"}>
        {
        isLoading
            ?
            <div className={"candidate_pledge"}>
                <ul>
                    <li>기호: <span style={{marginLeft:'10px', color:'red', fontWeight:600}}>{pledgeData.number}</span> 번</li>
                    <li>이름: <span style={{marginLeft:'10px'}}>{pledgeData.name}</span></li>
                    <li>학년: <span style={{marginLeft:'10px'}}>{pledgeData.grade}</span></li>
                </ul>
                <ul style={{marginTop:'30px'}}>
                    {career.map((data, index)=>(
                    <li key={index}>공약{index+1}: <span style={{marginLeft:'10px'}}>{data}</span></li>
                    ))}
                </ul>
                <ul style={{marginTop:'30px'}}>
                    {career.map((data, index)=>(
                        <li key={index} style={{fontWeight:600}}>공약{index+1}: <span style={{marginLeft:'10px'}}>{data}</span></li>
                    ))}
                </ul>
            </div>
            :
            <div className={"candidate_pledge"}>
                "Loading"
            </div>
        }
        </div>
    )
}

export default CandidatePledge
