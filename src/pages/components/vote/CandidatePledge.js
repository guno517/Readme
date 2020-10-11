import React, {useState, useEffect} from 'react';


const CandidatePledge = (props) => {
    const {pledgeData} = props;
    const [pledge, setPledge] = useState(); 
    useEffect(()=>{
        setPledge(pledgeData)
    })
    // pledge && console.log(pledge)
    return (
        <div className={"candidate_pledge"}>
           {pledge&&pledge.name}
        </div>
    )
}

export default CandidatePledge
