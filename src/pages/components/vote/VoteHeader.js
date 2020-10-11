import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { LinkComponent } from "../Common";
const VoteHeader = (props) => {
    const {voteMenu} = props;
    const dispatch = useDispatch()

    const menuChange = (id) =>{
        dispatch({
            type:'VOTE_UPDATE_MENU',
            id:id
        })
    }
    return (
        <div className={"vote_header"}>
            <ul className={"vote_ul"}>
                {voteMenu.map((list, index)=>(
                    <LinkComponent 
                        key={index}
                        id={list.id}
                        onClick={()=>menuChange(list.id)}
                        link={list.link}
                        name={list.name} 
                        isActive={list.isActive} 
                        activeColor={list.activeColor} 
                        isNotActiveColor={list.isNotActiveColor}
                    >
                    </LinkComponent>
                    ))
                }
            </ul>
        </div>
    )
}

export default VoteHeader
