import React from 'react'
import "./css/Poster.css";

const Poster = (props) => {
    console.log(props)
    return (
        <div className={"poster_img"}>
            <div className={props.class}>
                <img src={props.img} width="100%;"></img>
            </div>
        </div>
    )
}

export default Poster
