import React from 'react'

const Poster = (props) => {
    return (
        <div className={props.class1}>
            <div className={props.class2}>
                <img src={props.img} width="100%;" alt={"poster"}></img>
            </div>
        </div>
    )
}

export default Poster
