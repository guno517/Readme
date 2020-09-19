import React,{useState, useEffect} from 'react'
import "./css/MainPoster.css"   
import poster2 from "../../img/poster2.png"

const MainPoster = () => {
    const [animateText, setanimateText] = useState('animateText')
    const [animateText2, setanimateText2] = useState('none')
    const [animate3, setAnimate3] = useState('none')

const onAnimateText = () =>{
    setanimateText('animateText')
    setanimateText2('animateText2')
}
// import styled from 'styled-components'
useEffect(() => {
        onAnimateText();
}, [])

function getCurrentScroll(){
    return  window.scrollY
    }

document.addEventListener('scroll', () => {
    const currentScroll = getCurrentScroll()

    if (625 <= currentScroll){
        setAnimate3('animate_on')
        setanimateText('none')
        setanimateText2('none')
    }else if(currentScroll <= 500){
        setAnimate3('none')
        setanimateText('animateText')
        setanimateText2('animateText2')
    }else{
        return 0;
    }
})
    return (
        <div>
            <div className={"poster1"}>
                <div className={"animate_wrap"} >
                    <p className={animateText}><span className={animateText2}>공약 </span>보다 더</p>
                    <p className={animateText}>중요한건 <span className={animateText2}>실천 </span>입니다</p>
                </div>
            </div>
            <div className={"poster2"}>
                <div  className={animate3}>
                </div>
            </div>
            
        </div>
    )
}

export default MainPoster
