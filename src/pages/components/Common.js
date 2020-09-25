import React, {useState} from "react";
import { Link } from 'react-router-dom';

const LinkComponent = (props) => {
    const {id, link, name, isActive}  = props.menu;
    const { onClick } = props; //Menu Active Change Redux

    return(
        <li ><Link to={link} style={{color:isActive ? 'red' : 'black'}} >{name}</Link></li>
    )
}

export default  LinkComponent;