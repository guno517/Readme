import React, {useState, useEffect} from "react";
import {useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

export const LinkComponent = (props) => {
    const {id, onClick, link, name, isActive, activeColor, isNotActiveColor} = props
    return(
            <li onClick={onClick} ><Link to={link} style={{color:isActive ? activeColor : isNotActiveColor}} >{name}</Link></li>
    )
}

  // select 메뉴 데이터 가져오기
export const fetchSelectCode = async(dispatch) => {
    const response = await fetch('http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/codeTable')
    .then(async(response)=>{
        let selectMenu = await response.json();
        dispatch({
            type:"FETCH_SELECT_MENU",
            data:selectMenu
        })
    })
}
