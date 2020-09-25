import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'

const Council = (props) => {

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch({
            type:'UPDATE_MENU',
            id:1
        })
     })
    return(
        <div>
            학생회 페이지
        </div>
    )
}

export default Council;