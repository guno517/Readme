import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { LinkComponent } from "./Common";

const Menu = () => {
    const menu = useSelector(state => state.menu);

    return (
        <ul>
             {menu.map((list, index)=>(
                <LinkComponent key={index} link={list.link} name={list.name} isActive={list.isActive} activeColor={"white"} isNotActiveColor={"black"} />
             ))}
        </ul>
    )
}

export default Menu
