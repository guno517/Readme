import React, { useState, useEffect, useRef } from "react";
import {useSelector, useDispatch } from 'react-redux'

const CandidateSet = (props) =>{
    

    const [college, setCollege] = useState('');
    const [major, setMajor] = useState('');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [career, setCareer] = useState('');
    const [careerList, setCareerList] = useState([]);
    const [electionPledge, setElectionPledge] = useState('');
    const [electionPledgeList, setElectionPledgeList] = useState([]);

    const careerInput = useRef();
    const electionPledgeInput = useRef();

    let collegeCode = props.match.params.collegeCode;
    let majorCode = props.match.params.majorCode;
    // let selectInfo =  useSelector(state => state.selectFlagData)
    // let collegeName = selectInfo.collegeName;
    // let majorName = selectInfo.majorName;

    let dbUrl = `http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/candidate/insert/${collegeCode}/${majorCode}`
    
    // 해당 input onChange
    const collegeChange = (e) =>{
        setCollege(e.target.value);
    } 
    const majorChange = (e) =>{
        setMajor(e.target.value);
    } 
    const numberChange = (e) =>{
        setNumber(e.target.value);
    } 
    const nameChange = (e) =>{
        setName(e.target.value);
    } 
    const gradeChange = (e) =>{
        setGrade(e.target.value);
    } 
    const careerChange = (e) =>{
        setCareer(e.target.value);
    } 
    const electionPledgeChange = (e) =>{
        setElectionPledge(e.target.value);
    } 
    // 목록
    const prev = () =>{
        window.history.go(-1);
    }
    
    // 데이터 등록
    const dataSubmit = async()=>{
        let career = careerList.join("#");
        let election_pledge = electionPledgeList.join("#");

        await fetch(dbUrl,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                college:college,
                department:major,
                number:number,
                name:name,
                grade:grade,
                img:previewURL,
                career:career,
                election_pledge:election_pledge
            })
        })
        .then(()=>{
            window.history.go(-1);
        })
    }

    // 이미지 미리보기
    const [previewURL, setPreviewURL] = useState('');
    const handleFileOnChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setPreviewURL(()=>reader.result);
        }
        reader.readAsDataURL(file);
      }
 
    //   경력, 공약 데이터 리스트 변경
    const careerDataAdd = () =>{
        if(career===""){
            alert("공백을 입력하실 수 없습니다.")
        }
        setCareerList(careerList.concat(career));
        setCareer("")
        careerInput.current.focus();
    }
    const electionPledgeDataAdd = () =>{
        if(electionPledge===""){
            alert("공백을 입력하실 수 없습니다.")
        }
        setElectionPledgeList(electionPledgeList.concat(electionPledge));
        setElectionPledge("")
        electionPledgeInput.current.focus();
    }

    // 엔터 클릭시
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if(e.target.name === "career"){
                careerDataAdd();
            }else{
                electionPledgeDataAdd();
            }
        }
      };
        
    return(
        <div style={{marginLeft:'5%'}}>
            <h1 style={{marginTop:"100px", marginBottom:'40px'}}>입후보 등록</h1>

            <div style={{marginTop:'50px'}}>
            
                <Input 
                    value={college} 
                    placeholder={"후보자의 단과대학을 입력해주세요 ex) 경영대학"} 
                    changeEvent={collegeChange}
                ></Input>
                <Input 
                    value={major} 
                    placeholder={"후보자의 소속 학과를 입력해주세요 ex) 경영학과"} 
                    changeEvent={majorChange}
                ></Input>
                <Input 
                    value={number} 
                    placeholder={"후보자 기호 번호를 입력해주세요 ex) 1"} 
                    changeEvent={numberChange}
                ></Input>
                <Input 
                    value={name} 
                    placeholder={"이름을 입력해주세요"} 
                    changeEvent={nameChange}
                ></Input>
                <Input 
                    value={grade} 
                    placeholder={"학번을 입력해주세요"} 
                    changeEvent={gradeChange}
                ></Input>
            </div>

            <CandidateSubmit 
                className= {"career"}
                title = {"경력"}
                refs = {careerInput}
                value = {career}
                changeEvent = {careerChange}
                pressEvent = {handleKeyPress}
                name = {"career"}
                placeholder = {"경력을 입력하세요" }
                clickEvent = {careerDataAdd}
                listName={careerList}
            >
           </CandidateSubmit>

           <CandidateSubmit 
                className= {"electionPledge"}
                title = {"공약"}
                refs = {electionPledgeInput}
                value = {electionPledge}
                changeEvent = {electionPledgeChange}
                pressEvent = {handleKeyPress}
                name = {"electionPledge"}
                placeholder = {"공약을 입력하세요" }
                clickEvent = {electionPledgeDataAdd}
                listName={electionPledgeList}
            >
           </CandidateSubmit>
            
            <div className={"thumbnail"} style={{ marginBottom:'40px'}}>
                <h1>프로필 이미지 (선택)</h1>
                <input type='file' 
                        accept='image/jpg,impge/png,image/jpeg,image/gif' 
                        name='profile_img' 
                        onChange={handleFileOnChange}>
                </input>
                {previewURL === '' ? '' : <img className='profile_preview' style={{width:'20%', height:"250px"}} src={previewURL} alt="thumbnail"></img> }
            </div>

            <div style={{width:'100%', textAlign: 'right'}}>
                <button onClick={prev} style={{width:'100px', height:'30px',marginRight:'1%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'white', color:'#59AAEB', borderRadius:'5px', outline:'none'}}>목록</button>
                <button onClick={dataSubmit} style={{width:'100px', height:'30px',marginRight:'3%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'#59AAEB', color:'white', borderRadius:'5px'}}>등록</button>
            </div>
          
        </div>
    )
}
// 입후보자 기호, 이름, 학년
const Input = (props) =>{
    const {value, placeholder, changeEvent} = props;
    return(
        <input
            value={value} 
            type="text" placeholder={placeholder}
            onChange={changeEvent}
            style={{ display:'block', width:'290px', height:'35px', marginBottom:'2%', marginRight:'10px', paddingLeft:'1%'}}>
        </input>
    )
}
// 경력 및 공약 등록
const CandidateSubmit = (props) =>{
    const {className, title, refs, value, changeEvent, pressEvent, name, placeholder, clickEvent, listName } = props;
    return(
        <div className={className} style={{ marginBottom:'40px'}}>
            <h1>{title}</h1>
            <input 
                ref={refs} 
                value = {value} 
                onChange={changeEvent} 
                onKeyPress={pressEvent} 
                name={name}
                type="text" 
                placeholder={placeholder}
                style={{width:'250px', height:'35px'}}
            />
            <button 
                onClick={clickEvent}
                style={{
                    width:"80px",
                    height:"40px",
                    border: "1px solid rgb(130, 162, 209)",
                    backgroundColor: "rgb(89, 170, 235)",
                    color: "white",
                    borderRadius: "3px",
                    marginLeft:'2%',
                }}
            >등록</button>

            <ul style={{padding:'10px'}}>
                {listName && listName.map((data, index)=>(
                    <li key={index} style={{marginTop:"10px"}}>{data}</li>
                ))}
            </ul>
        </div>
    )
}


  export default CandidateSet;
