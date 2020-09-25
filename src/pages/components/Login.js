import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'

const Login = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
       dispatch({
           type:'UPDATE_MENU',
           id:4
       })
    })

    return(
        <div>
          로그인 페이지
        </div>
    )
}

export default Login;