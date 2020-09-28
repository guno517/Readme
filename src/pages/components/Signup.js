import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "./css/Signup.css";
const Signup = () => {
    // const [idOverlapCheck, setIdOverlapCheck] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [college, setCollege] = useState('');
    const [department, setDepartment] = useState('');
    const [student_number, setStudent_number] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userPwCheck, setUserPwCheck] = useState('');

    const onChangeValue = (e) => {
        if(e.target.className === "name"){
            setName(e.target.value)
        }else if(e.target.className === "id"){
            setId(e.target.value)
        }else if(e.target.className === "college"){
            setCollege(e.target.value)
        }else if(e.target.className === "department"){
            setDepartment(e.target.value)
        }else if(e.target.className === "student_number"){
            setStudent_number(e.target.value)
        }else if(e.target.className === "userPw"){
            setUserPw(e.target.value)
        }else if(e.target.className === "userPwCheck"){
            setUserPwCheck(e.target.value)
        }
    }
    const dataSubmit = async() =>{
        let day = new Date();
        let y = day.getFullYear();
        let m = day.getMonth()+1;
        let d = day.getDate();
        let h = day.getHours();
        let i = day.getMinutes();
        let time = y+"-"+m+"-"+d+" "+h+":"+i;
        if(!signUpSuccess){
            checkSignUp(college, department, name, id, student_number, userPw, userPwCheck);
        }else{
            const response = await fetch('http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/signup',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    name:name,
                    id:id,
                    college:college,
                    department:department,
                    student_number:student_number,
                    pass:userPw,
                    userPwCheck:userPwCheck
                })
            })
            .then(async(response) =>{
                console.log(response)
                // 건오 api 개발시 수정 
                // if(idOverlapCheck){
                //     alert("ID 중복 체크를 해주세요");
                // }
                // else{
                    alert("회원가입이 완료 되었습니다.");
                    window.history.go(0)
                // }
            })
            .catch(e => {  // API 호출이 실패한 경우
                alert("회원가입에 실패하였습니다.")
                // window.history.go(0)
            });
        }
    }
    // 건오 api 개발시 수정 
    //   const IdCheck = () =>{
    //     let id = document.querySelector(".id").value;

    //     axios
    //     .post('http://localhost:5000/api/signup/check/id',null,{
    //         params: {
    //         id,
    //         }
    //     })
    //     .then(({ data }) => {
    //         if(data.id.length !== 0){
    //             alert("이미 가입된 ID 입니다.");
    //         }else{
    //             alert("사용하실 수 있는 ID 입니다.")
    //             setIdOverlapCheck(true);
    //         }
    //     })
    //     .catch(e => {  // API 호출이 실패한 경우
    //     });
    //   }
      
        // // 중복 체크 검증 후 ID 수정을 막기 위해
        // const overLabError = () =>{
        //     setIdOverlapCheck(false);
        // }
        
        const checkSignUp = (college, department, name, id, student_number, userPw, userPwCheck) =>{
            // let getCheck= RegExp(/^[a-zA-Z0-9]{4,20}$/);
            // let getemail= RegExp(/^[0-9a-zA-Z][0-9a-zA-Z\_\-]*[0-9a-zA-Z](\.[a-zA-Z]{2,6}){1,2}$/);
            // let getName = RegExp(/^[가-힣]+$/);
            // let getNum  = RegExp(/^[0-9]*$/);
            
            if(!college){
                alert("소속 단대를 선택하여주세요.");
            }
            else if(!department){
                alert("소속 학과를 선택하여주세요.");
            }
            else if(!name){
                alert("이름을 입력하여주세요.");
            }
            // else if(!getName.name){
            //     alert("이름을 한글로 입력해주세요");
            // }
            else if(!id){
                alert("ID를 입력하여주세요.");
            }
            // else if(!getCheck.id){
            //     alert("한글및 특수기호는 입력하실 수 없습니다.");
            // }
            else if(!userPw || !userPwCheck){
                alert("패스워드를 입력하여주세요.");
            }
            else if(userPw != userPwCheck){
                alert("패스워드가 일치하지 않습니다.");
            }
            else if(userPw.length < 6 || userPwCheck.length < 6){
                alert("패스워드를 6자리 이상으로 입력해주세요.");
            }
            else if(!student_number){
                alert("학번을 입력하여 주세요.");
            }
            // else if(!getCheck.email){
            //     alert('Email 은 4글자 이하, 한글및 특수기호는 입력하실 수 없습니다.');
            // }
            // else if(!getemail.email){
            //     alert('이메일 형식을 확인해주세요');
            // }
            else{
                setSignUpSuccess(true);
            }
        }

    return(
        <div className={"content"}>
            <div className={"signup_wrap"}>
                <div className={"signup_form"}>
                    <h2>Sign up</h2>
                    
                    <h4>단과대학</h4>
                    <select className={"college"} onChange={onChangeValue}>
                        <option value="">선택</option>
                        <option value="총학생회">총학생회</option>
                        <option value="IT대학">IT대학</option>
                        <option value="예술대학">예술대학</option>
                    </select>

                    <h4>학과</h4>
                    <select className={"department"} type="date" onChange={onChangeValue}>
                        <option value="">선택</option>
                        <option value="컴퓨터공학과">컴퓨터공학과</option>
                        <option value="시각디자인학과">시각디자인학과</option>
                        <option value="건축학과">건축학과</option>
                    </select>

                    <h4>학번</h4>
                    <input className={"student_number"} type="text" placeholder="학번" onChange={onChangeValue}></input>

                    <h4>이름</h4>
                    <input className={"name"} type="text" placeholder="name" onChange={onChangeValue}></input>
                    
                    <h4>ID</h4>
                    <input className={"id"} type="text" placeholder="ID" onChange={onChangeValue}></input>
                    <button className={"idCheck"} >중복체크</button>
                    
                    <h4>Password</h4>
                    <input className={"userPw"} type="password" placeholder="password" onChange={onChangeValue}></input>
                    
                    <h4>Password Check</h4>
                    <input className={"userPwCheck"} type="password" placeholder="password" onChange={onChangeValue}></input>
                    
                    <button className={"signup_signup"} type="button" onClick = {dataSubmit}><Link to="/" >Sign up</Link></button>
                    </div>
            </div>
        </div>
    )
}

export default Signup;