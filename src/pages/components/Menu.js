import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import LinkComponent from "./Common";

const Menu = () => {
    const dispatch = useDispatch()
    const menu = useSelector(state => state.menu);

    // Menu Active Change Redux
    const menuActive = (id) => {
        dispatch({
            type:'UPDATE_MENU',
            id:id
        })
    }

    return (
        <ul>
             {menu.map((list, index)=>(
                <LinkComponent key={index} menu={list} onClick={menuActive} />
             ))}
        </ul>
    )
}

export default Menu
