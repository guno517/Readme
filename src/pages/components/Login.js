import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import "./css/Login.css";

const Login = (props) => {

    const loginActive = window.sessionStorage.getItem("id");
    const loginFlag = loginActive !== null ? true : false;

    const [id, setId] = useState('');
    const [pass, setpPass] = useState('');

    const changeInput = (e) =>{
        let type = e.target.className
        if(type === 'id'){
            setId(e.target.value)
        }
        else{
            setpPass(e.target.value)
        }
    }

    const dispatch = useDispatch()
    useEffect(()=>{
        if(loginFlag){
            window.history.go(-1)
        }

       dispatch({
           type:'UPDATE_MENU',
           id:4,
           name:"login"
       })
    },[])

    const enterKey = () => {
        if(window.event.keyCode === 13){
            LoginSubmit();
        }
    }
    
    const ready = () =>{
        window.history.go(0);
        alert("준비중입니다.");
    }
    // 로그인 정보 세션 저장
    const  sessionSave = (seesionName, sessionData) => {
        window.sessionStorage.setItem(seesionName, sessionData);
    }

    const LoginSubmit = async() =>{
        if(id && pass !== ''){
            const response = await fetch("http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/login", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    pass: pass         
                })
            }
            )
            .then(async(response) => {
                const response_json = await response.json();
                const member = response_json.user[0];
                sessionSave("id", member['id'])
                sessionSave("college", member['college'])
                sessionSave("department", member['department'])
                // dispatch({
                //     type:'LOGIN_SUCCESS',
                //     id:member['id'],
                //     college:member['college'],
                //     department:member['department'],
                // })
                dispatch({
                    type:'LOGIN_MENU',
                })
            })
            .then(() =>{
                alert("로그인에 성공하셨습니다.");
                window.history.go(0);
            })
            .catch(e => {
                alert("로그인에 실패하셨습니다.");
                window.history.go(-1);
            })
            
            return response;
        }else{
            alert("ID / PassWord 를 입력해주세요");
        }
    }

    return(
        <div className={"content"}>
            <div className={"login_wrap"}>
                <div className={"login_form"} onKeyUp = {enterKey}>
                    <h2>Sign in</h2>
                    <h4 >ID</h4>
                    <input className={"id"} type="text" onChange={changeInput} placeholder="ID"></input>
                    <h4>PassWord</h4>
                    <input className={"pass"} type="PassWord" onChange={changeInput} placeholder="PassWord"></input>
                    <div className={"sign_button"}>
                        <button className={"sign_in"} type="button" onClick = {LoginSubmit}><Link to="/">Sign in</Link></button>
                        <button className={"sign_up"} type="button"><Link onClick={ready} to="/">Sign up</Link></button>
                        <span className={"forget"}><Link onClick={ready} to="/">로그인 정보를 잊어 버리 셨나요?</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

   



   
