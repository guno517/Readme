import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux'
import CouncilChart from './CouncilChart'

const Council = (props) => {

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch({
            type:'UPDATE_MENU',
            id:1,
            name:"학생회"
        })
     })
     console.log(CouncilChart);
    return(
        <div>
            {/* <div class="dropdown">
                <button onClick={dropdownFunction}>
                    단과대학
                </button>
                    <Link to={'/council/'}>IT융합대학</Link>
                
                드롭박스
            </div> */}
            <div>
                <CouncilChart></CouncilChart>
                <div>
                    공약 현황 막대 그래프
                </div>
            </div>
            <div>
                공약 목록 버튼
            </div>
            <div>
                이행 인증 공약 캐러셀
            </div>
            <div>
                <div>
                    공약 등록 버튼
                </div>
                <div>
                    이행 인증 버튼
                </div>
            </div>
        </div>
    )
}

export default Council;