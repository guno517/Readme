import React, {useState, useEffect} from "react";
import {useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

// 데이터 getFecth
export const fetchApiGet = async(ApiUrl) => {
    const response = await fetch(ApiUrl)
    .then(async(response)=>{
        if(response.ok){
            const response_json = await response.json();
            return response_json;
        }else{
        throw new Error('Something went wrong');
        }
    })
    .catch((error) => {
        console.log(error)
    });
}

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

export const DataListAdd = (props) =>{
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