import React, {useState, useEffect} from 'react';

const VoteResultDisplay = (props) => {

    const [elected ,setElected] = useState({pledge:0})
    // const {listdata} = props;
    let listdata = [
        {
            "index": 2,
            "college": "IT대학",
            "department": "컴퓨터공학과",
            "collegeId": 7,
            "deptId": 2,
            "election_total": 1200,
            "candidate": [
                 {
                      num:1,
                      name:"이태희",
                      pledge:700,
                      img:"https://3op1xd1bmnmj3sxtuj4a6m1q-wpengine.netdna-ssl.com/ryogoku/wp-content/uploads/sites/9/2020/03/test-img-300x196.jpg"
                  },
                  {
                      num:2,
                      name:"변건오",
                      pledge:500,
                      img:"https://3op1xd1bmnmj3sxtuj4a6m1q-wpengine.netdna-ssl.com/ryogoku/wp-content/uploads/sites/9/2020/03/test-img-300x196.jpg"
                  },{
                    num:2,
                    name:"변건오",
                    pledge:500,
                    img:"https://3op1xd1bmnmj3sxtuj4a6m1q-wpengine.netdna-ssl.com/ryogoku/wp-content/uploads/sites/9/2020/03/test-img-300x196.jpg"
                }
           
             
                ],
            "total_voter": "1500"
          },
    ]
    useEffect(()=>{
        // eslint-disable-next-line no-lone-blocks
        for(let i = 0; i<listdata[0].candidate.length; i++){
            if(elected.pledge<listdata[0].candidate[i].pledge){
                setElected(listdata[0].candidate[i])
            }
        }
    })

    console.log(elected);
    return (
        <div className="result_candidate_wrap">
            <h2>개표결과</h2>
            <div className="result_candidate_list_wrap">
                {listdata[0].candidate.map((candidate, index)=>(
                    <div className="result_candidate_list" key={index}>
                        <div className={"result_candidate_img"}>
                            <img src={candidate.img} alt="선거결과 그래프"></img>
                        </div>
                        <p className={"result_turnout"}><b><span style={candidate.num === elected.num?{color:"red"}:{color:"blue"}}>{(candidate.pledge / listdata[0].election_total * 100).toFixed(1)} %</span> </b> </p>
                        <p><b>기호: <span style={candidate.num === elected.num?{color:"red"}:{color:"blue"}}>{candidate.num}</span> 번</b></p>
                        <p><b>이름: {candidate.name}</b>  </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VoteResultDisplay