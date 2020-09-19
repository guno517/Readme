import React,{useState, useEffect} from 'react'
import "./css/MainPoster.css"   
import poster_img1 from '../../img/poster1.png'


let posterStyle = {
    width:"100%",
    height:"1000px",
    backgroundImage: `url(${poster_img1})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
};
let animate_wrap = {
    paddingTop: "10%",
    height: "250px",
    margin: "0 auto",
    width: "80%",
    textAlign: "center",
}

let animate_wrap_p ={
    color:"rgb(189,91,97)",
    fontSize:'50px',
    margin:0,
    display:"inline-block",
    transition: "2s",
}
let animate_wrap_p2 ={
    color:'rgb(189,91,97)',
    fontSize:'56px',
    margin:0,
    fontWeight:'600',
    transition: "2s",
}

const MainPoster = () => {
    const [animateText, setanimateText] = useState('none')
    const [animateText2, setanimateText2] = useState('none')

const onAnimateText = () =>{
    setanimateText('animateText')
    setanimateText2('animateText2')
}
// import styled from 'styled-components'
useEffect(() => {
        onAnimateText();
}, [])
    return (
        <div>
            <div style={posterStyle}>
                <div className={"animate_wrap"} style={animate_wrap}>
                    <p className={animateText}>공약보다 더</p>
                    <p className={animateText2}>중요한건 실천입니다</p>
                </div>
            </div>
        </div>
    )
}

export default MainPoster
