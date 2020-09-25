import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
   
const Vote = (props) => {
    const dispatch = useDispatch()

    useEffect(()=>{
       dispatch({
           type:'UPDATE_MENU',
           id:2
       })
    })

    return(
        <div>
            선거 페이지
        </div>
    )
}

export default Vote;