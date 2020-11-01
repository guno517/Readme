import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'

const Vote = (props) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        window.sessionStorage.clear();
        dispatch({
            type:'LOGOUT_MENU',
        })
        // dispatch({
        //     type:'LOGOUT_SUCCESS'
        // })
        alert("로그아웃 되었습니다.");
        window.history.go(-1)
    })

    return(
        <div>
        </div>
    )
}

export default Vote;