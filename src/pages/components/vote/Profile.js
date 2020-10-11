import React from 'react'

const Profile = (props) => {
    const {listdata, onClick} = props
    return (
        <div className={"candidate_list_container"}>
            {listdata.map((candidate, index)=>(
                <div className={"candidate_list"} key={index}>
                    <div className={"candidate_profile"} onClick={()=>onClick(candidate.number)}>
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
