import React,{useState, useEffect} from 'react'
import Poster from "./Poster"
import "./css/MainPoster.css"   

const poster1 =  require("../../img/poster1.png");
const poster2 =  require("../../img/poster2.png");
const poster3 =  require("../../img/poster2.png");
const poster4 =  require("../../img/poster2.png");

const MainPoster = () => {
    const [animatePoster, setanimatePoster1] = useState('none')
    const [animateText, setAnimateText] = useState('none')
    const [animateText1, setanimateText1] = useState('none')
    const [posterImg2, setAnimatePoster2] = useState('none')
    const [posterImg3, setAnimatePoster3] = useState('none')
    const [posterImg4, setAnimatePoster4] = useState('none')
    const [width, setWidth] = useState(1000)
    const [divice, setDevice] = useState('pc')

const onAnimateText = () =>{
    setTimeout(()=>{
        setanimatePoster1('poster1_on')
    },100)
    setTimeout(()=>{
        setAnimateText('animate_text')
    },1400)
    setTimeout(()=>{
        setanimateText1('animate_text1')
    },3200)
}

// window 창 크기 별 scroll 분기를 위해
const mobileCheck = () =>{
    if(1600 < window.innerWidth){
        setWidth(950)
        setDevice('pc')
    }
    else if(1400 < window.innerWidth){ 
        setWidth(750)
    }
    else if(1200 < window.innerWidth){ 
        setWidth(550)
    }
    else if(1000 < window.innerWidth){ 
        setWidth(300)
    }
    else{
        setWidth(5)
        setDevice('mob')
        setTimeout(()=>{
            setAnimatePoster2('poster_img_on')
        },300)
    }
}
useEffect(() => {
    mobileCheck();
    onAnimateText();
}, [])

// 마우스 위치 알기
function getCurrentScroll(){
    return  window.scrollY
}

document.addEventListener('scroll', () => {
    const currentScroll = getCurrentScroll()
    if(divice == 'pc'){
        if (width <= currentScroll){
            setAnimatePoster2('poster_img_on')
            setanimatePoster1('none')
            setanimateText1('none')
        }else if(currentScroll <= width){
            setAnimatePoster2('none')
            setanimatePoster1('poster1_on')
            setanimateText1('animate_text1')
        }else{
            return 0;
        }
    }else{
        setanimatePoster1('poster1_on')
        setAnimatePoster2('poster2_on')
    }
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
