import React,{useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import Menu from "./components/Menu";

import "./css/Header.css";
const Header = (props) =>{
   
    return (
        <div className = {"header"}>
            <div className = {"top"}>
                <div className = {"logo"}>
                    <Link to="/"><img src='/images/readmeLogo.png'></img></Link>
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

