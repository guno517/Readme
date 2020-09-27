import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import "./css/Login.css";

const Login = (props) => {

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
       dispatch({
           type:'UPDATE_MENU',
           id:4
       })
    },[])

    const enterKey = () => {
        if(window.event.keyCode === 13){
            LoginSubmit();
        }
    }

    // 로그인 정보 세션 저장
    const  sessionSave = (seesionName, sessionData) => {
        window.sessionStorage.setItem(seesionName, sessionData);
    }

    const LoginSubmit = async() =>{
        const response = await fetch("http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:5000/login", {
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
            for (let arr in member){ 
                sessionSave(arr, member[arr])
            }
        })
        .then(() =>{
            alert("로그인에 성공하셨습니다.");
        })
        .catch(e => {
            window.location.href = "http://localhost:3000/login";
           alert("로그인에 실패하셨습니다.");
        })
        
        return response;
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
                        <button className={"sign_up"} type="button"><Link to="/">Sign up</Link></button>
                        <span className={"forget"}><Link to="/">로그인 정보를 잊어 버리 셨나요?</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

   



   
