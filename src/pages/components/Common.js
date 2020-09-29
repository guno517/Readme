import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

const LinkComponent = (props) => {
    const {id, onClick, link, name, isActive, activeColor, isNotActiveColor} = props
    return(
            <li onClick={onClick} ><Link to={link} style={{color:isActive ? activeColor : isNotActiveColor}} >{name}</Link></li>
    )
}

export default  LinkComponent;