import React, { useState, useEffect } from "react";
import SelectCollege from "../SelectCollege";
import {useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { fetchSelectCode } from "../Common";
const VoteAdmin = () => {
    const dispatch = useDispatch();
    const select = useSelector(state => state.selectFlagData);
    const college = select.college;
    const major = select.major;

    const [voter, setVoter] = useState();
    const [num1, setNum1] = useState();
    const [num2, setNum2] = useState();
    const [num3, setNum3] = useState();
    const [invalid, setInvalid] = useState();
    const [total_votes, setTotalVotes] = useState();
    
    const [vote1_1, setvote1_1] = useState();
    const [vote1_2, setvote1_2] = useState();
    const [vote2_1, setvote2_1] = useState();
    const [vote2_2, setvote2_2] = useState();
    const [vote3_1, setvote3_1] = useState();
    const [vote3_2, setvote3_2] = useState();

    


    const dataDispatch = (college, major) =>{
        
    }
    useEffect(() => {
        fetchSelectCode(dispatch);

    }, [])

    const setData = () =>{
        let data ={
            voter:voter,
            candidate:[
                num1,
                num2,
                num3,
            ],
            invalid:invalid,
            total_votes:total_votes,
            turn_out:[
                parseInt(vote1_1),
                parseInt(vote1_2),
                parseInt(vote2_1),
                parseInt(vote2_2),
                parseInt(vote3_1),
                parseInt(vote3_2)
            ]
        }
        datasubmit(data)
        
    }
    
    const datasubmit = (data) =>{
            fetch("http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/vote/insert/result", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                result:data,
                collegeId:college,
                deptId:major   
                })
            }).then(()=>{
                alert("등록되었습니다.");
                setVoter("")
                setNum1("")
                setNum2("")
                setNum3("")
                setInvalid("")
                setTotalVotes("")
                setvote1_1("")
                setvote1_2("")
                setvote2_1("")
                setvote2_2("")
                setvote3_1("")
                setvote3_2("")
            })
    }

const changeData = (e) =>{
    let value = e.target.value;
    let id = e.target.id;
    if(id === "voter"){
        setVoter(value);
    }else if(id === "num1"){
        setNum1(value);
    }
    else if(id === "num2"){
        setNum2(value);
    }
    else if(id === "num3"){
        setNum3(value);
    }
    else if(id === "invalid"){
        setInvalid(value);
    }
    else if(id === "total_votes"){
        setTotalVotes(value);
    }else if(id === "1_1"){
        setvote1_1(value);
    }
    else if(id === "1_2"){
        setvote1_2(value);
    }
    else if(id === "2_1"){
        setvote2_1(value);
    }
    else if(id === "2_2"){
        setvote2_2(value);
    }
    else if(id === "3_1"){
        setvote3_1(value);
    }
    else if(id === "3_2"){
        setvote3_2(value);
    }
}

const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        setData();
    }
  };
    return (
        <div style={{marginLeft:"50px"}}>
            <div style={{marginTop:"100px"}}>
                <SelectCollege dataDispatch={dataDispatch}></SelectCollege>
            </div>    

            <table style={{border:'1px solid black',marginTop:"50px", borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <td style={{border:'1px solid black', textAlign:"center"}}>유권자수</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>후보1</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>후보2</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>후보3</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>무효표</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>유효표</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input  type="text" id="voter" value={voter} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="num1" value={num1} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="num2" value={num2} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="num3" value={num3} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="invalid" value={invalid} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="total_votes" value={total_votes} style={{width:"80%", marginLeft:"10%"}} onChange={changeData}></input></td>
                    </tr>
                </tbody>
            </table>
            <table style={{border:'1px solid black',marginTop:"50px", borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <td style={{border:'1px solid black', textAlign:"center"}}>1일차 오전</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>1일차 오후</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>2일차 오전</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>2일차 오후</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>3일차 오전</td>
                        <td style={{border:'1px solid black', textAlign:"center"}}>3일차 오후</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input  type="text" id="1_1" value={vote1_1} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="1_2" value={vote1_2} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="2_1" value={vote2_1} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="2_2" value={vote2_2} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="3_1" value={vote3_1} style={{width:"80%", marginLeft:"10%"}}  onChange={changeData}></input></td>
                        <td style={{border:'1px solid black', textAlign:"center"}}><input type="text" id="3_2" value={vote3_2} style={{width:"80%", marginLeft:"10%"}} onKeyPress = {handleKeyPress} onChange={changeData}></input></td>
                    </tr>
                </tbody>
            </table>
            <Link style={{color:"white"}} to={`/vote`}><button style={{marginTop:"10px", backgroundColor:"#5CACF2", outline:"none", color:"white", border:"1px solid #e3e3e3", width:"50px", height:"23px"}} type="button">목록</button></Link>
            <button style={{marginTop:"10px", marginLeft:"10px", backgroundColor:"#5CACF2", outline:"none", color:"white", border:"1px solid #e3e3e3", width:"50px", height:"23px"}} onClick={setData} type="button">등록</button>
        </div>
    )
}

export default VoteAdmin