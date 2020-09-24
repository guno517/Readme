import React,{useState, useEffect} from 'react'
import Poster from "./Poster"
import "./css/MainPoster.css"   

const poster1 =  require("../../img/poster1.png");
const poster2 =  require("../../img/poster2.png");
const poster3 =  require("../../img/poster1.png");
const poster4 =  require("../../img/poster2.png");

const MainPoster = () => {
    const [animatePoster, setAnimatePoster1] = useState('none')
    const [animateText, setAnimateText] = useState('none')
    const [animateText1, setAnimateText1] = useState('none')
    const [posterImg2, setAnimatePoster2] = useState('none')
    const [posterImg3, setAnimatePoster3] = useState('none')
    const [posterImg4, setAnimatePoster4] = useState('none')
    const [width, setWidth] = useState()
    const [width2, setWidth2] = useState()
    const [width3, setWidth3] = useState()
    const [device, setDevice] = useState('pc')

const onAnimateText = () =>{
    setTimeout(()=>{
        setAnimatePoster1('poster1_on')
    },100)
    setTimeout(()=>{
        setAnimateText('animate_text')
    },1400)
    setTimeout(()=>{
        setAnimateText1('animate_text1')
    },3200)
}

// window 창 크기 별 scroll 분기를 위해
const mobileCheck = () =>{

    if(350 <= window.innerWidth && window.innerWidth <600){
        setWidth(0)
        setWidth2(160)
        setWidth3(440)
        setAnimatePoster2('poster_img_on')
    }
    else if(600 <= window.innerWidth && window.innerWidth  < 800){ 
        setWidth(0)
        setWidth2(450)
        setWidth3(980)
        setAnimatePoster2('poster_img_on')

    }
    else if(800 <= window.innerWidth && window.innerWidth  < 1000){ 
        setWidth(100)
        setWidth2(700)
        setWidth3(130)
    }
    else if(1000 <= window.innerWidth && window.innerWidth  < 1200){ 
        setWidth(450)
        setWidth2(1150)
        setWidth3(1950)
    }
    else if(1200 <= window.innerWidth && window.innerWidth  < 1400){
        setWidth(450)
        setWidth2(1300)
        setWidth3(2300)
    }
    else if(1400 <= window.innerWidth && window.innerWidth  < 1600){ 
        setWidth(700)
        setWidth2(1800)
        setWidth3(2900)
    }
    else if(1600 < window.innerWidth){
        setWidth(700)
        setWidth2(1800)
        setWidth3(3080)
    }
    else{
        setWidth(950)
        setWidth3(3000)
    }
}
useEffect( () => {
    mobileCheck();
    onAnimateText();

}, [])

// 마우스 위치 알기
function getCurrentScroll(){
    return  window.scrollY
}

document.addEventListener('scroll', () => {
    const currentScroll = getCurrentScroll()
    // if(divice === 'pc'){
        if(currentScroll < width){
            setAnimatePoster1('poster_img_on')
        }
        else if (width <= currentScroll && currentScroll < width2){
            setAnimatePoster2('poster_img_on')
        }else if(width2<= currentScroll && currentScroll < width3){
            setAnimatePoster3('poster_img_on')
        }else if(width3 <= currentScroll){
            setAnimatePoster4('poster_img_on')
        }
        else{
            return 0;
        }
    // }else{
    //     setAnimatePoster1('poster1_on')
    //     setAnimatePoster2('poster2_on')
    // }
})

    return (
       <div>
            <div className={"poster1"}>
                <img className={animatePoster} src={poster1} width="100%;"></img>
                <div className={"animate_wrap"} >
                    <p className={animateText}><span className={animateText1}>공약</span> 보다 더</p>
                    <p className={animateText}>중요한건 <span className={animateText1}>실천 </span>입니다</p>
                </div>
            </div>
            <Poster class={posterImg2} img={poster2}></Poster>
            <Poster class={posterImg3} img={poster3}></Poster>
            <Poster class={posterImg4} img={poster4}></Poster>
        </div>
    )
}

export default MainPoster
