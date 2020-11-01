import React, { useState, useEffect, useRef } from "react";
import { DataListAdd } from '../Common';

const CouncilTotalEditor = (props) => {
    const [council, setcouncil] = useState("");
    const [councilList, setcouncilList] = useState([]);
    const [index, setIndex] = useState('');
    const [collegeId, setCollegeId] = useState('');
    const [deptId, setDeptId] = useState('');
    const [pledge, setName] = useState('');
    const [grade, setGrade] = useState('');
    const councilInput = useRef();

    let collegeCode = props.match.params.college;
    let majorCode = props.match.params.major;

    let dbUrl = `http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/check/${collegeCode}/${majorCode}`

    const councilChange = (e) => {
        setcouncil(e.target.value);
    };
    
    const councilDataAdd = () => {
        if (council === "") {
            alert("공백을 입력하실 수 없습니다.");
        }
        setcouncilList(councilList.concat(council));
        setcouncil("");
        councilInput.current.focus();
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            councilDataAdd();
        }
    };

    // 목록
    const prev = () =>{
        window.history.go(-1);
    }
    
    // 데이터 등록
    const dataSubmit = async()=>{
        await fetch(dbUrl,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                councilList:councilList,
            })
        })
        .then(()=>{
            window.history.go(-1);
        })
    }
    
    return (
        <div style={{marginLeft:'5%', marginTop:"100px", marginBottom:'40px'}}>
            <DataListAdd
                className={"council"}
                title={"공약"}
                refs={councilInput}
                value={council}
                changeEvent={councilChange}
                pressEvent={handleKeyPress}
                name={"council"}
                placeholder={"공약을 입력하세요"}
                clickEvent={councilDataAdd}
                listName={councilList}
            ></DataListAdd>
            <div style={{width:'100%', textAlign: 'right'}}>
                <button onClick={prev} style={{width:'100px', height:'30px',marginRight:'1%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'white', color:'#5CACF2', borderRadius:'5px', outline:'none'}}>목록</button>
                <button onClick={dataSubmit} style={{width:'100px', height:'30px',marginRight:'3%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'#5CACF2', color:'white', borderRadius:'5px'}}>등록</button>
            </div>
        </div>
    );
};

export default CouncilTotalEditor;