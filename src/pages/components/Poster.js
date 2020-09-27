import React from 'react'

const Poster = (props) => {
    return (
        <div className={"poster_img"}>
            <div className={props.class}>
                <img src={props.img} width="100%;" alt={"poster"}></img>
            </div>
        </div>
    )
}

export default Poster
