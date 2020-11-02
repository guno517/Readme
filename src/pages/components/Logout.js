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
        alert("README를 이용해 주셔서 감사합니다.");
        window.history.go(-1)
    })

    return(
        <div>
        </div>
    )
}

export default Vote;