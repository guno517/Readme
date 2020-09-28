import React,{useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Menu from "./components/Menu";
import Logo from "../img/readmeLogo.png"
import "./css/Header.css";


const Header = (props) =>{
    const dispatch = useDispatch()
     const menuActive = (id) => {
        dispatch({
            type:'UPDATE_MENU',
            id:id
        })
    }

    useEffect(()=>{
        if(window.sessionStorage.getItem("id") !== null){
            dispatch({
                type:"LOGIN_MENU",
            })
        }
    })

    return (
        <div className = {"header"}>
            <div className = {"top"}>
                <div className = {"logo"}>
                    <Link to="/" onClick={()=>menuActive(0)}><img src={Logo}></img></Link>
                </div>
                <div className = {"navigation"}>
                    <div className={"pc_navigation"}>
                        <Menu></Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header

