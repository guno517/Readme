import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

const SelectCollege = (props) => {
    const {dataDispatch} = props
    const dispatch = useDispatch()
    const allSelectList = useSelector(state => state.selectAll)
    const collegeSelectList = useSelector(state => state.selectCollege)
    const [collegeValue, setCollegeValue] = useState();
    const [majorValue, setmajorValue] = useState();

    // select 박스 단과대학 변경
    const onChangeCollege = (e) =>{
        let college = parseInt(e.target.value);
        let stateFilter = allSelectList.codeTable.filter(f=>{
            return f.collegeId === parseInt(college);
        })
        // 하위 select 리스트
        dispatch({
            type:"FETCH_SELECT_MENU_COLLEGE",
            data:stateFilter
        })

        // target.value 저장
        dispatch({
            type:"SELECT_MENU_DATA",
            college:parseInt(college),
        })
        
        // 표출될 데이터 redux dispatch
        
        dataDispatch(college,0)
        
        // 하위 select (Major) value 0으로 초기화
        setCollegeValue(college);
        document.querySelector("#major").value = '0';
    }

    const onChangeMajor = (e) =>{
        let major = parseInt(e.target.value);
        setmajorValue(major);
        // target.value 저장
         dispatch({
            type:"SELECT_MENU_DATA",
            major:parseInt(major)
        })
        dataDispatch(collegeValue,major)
    }

    useEffect(()=>{
        // // 최초의 두번째 select option 데이터 초기값을 위해 dispatch 실행
        // let stateFilter = allSelectList.codeTable.filter(f=>{
        //     return f.collegeId === parseInt(0);
        // })
        dispatch({
            type:"FETCH_SELECT_MENU_COLLEGE",
            data:[{
                "index": 1,
                "collegeId": 0,
                "deptId": 0,
                "collegeName": "총학생회",
                "deptName": "총학생회"
              }]
        })
    },[])
    console.log(document.querySelector("#college").value);
    console.log(document.querySelector("#major").value);
}

const options = {
    chart: {
        type: "pie",
    },
    credits: {
        enabled: false,
    },
    title: {
        text: "총학생회 공약 이행 현황",
    },
    series: [
        {
            name: "공약",
            colorByPoint: true,
            data: [
                {
                    name: "공약 개수",
                    y: 12,
                },
                {
                    name: "이행 완료",
                    y: 3,
                },
            ],
        },
    ],
};

function CouncilChart() {
    return (
        <div>
            <PieChart highcharts={Highcharts} options={options}></PieChart>
        </div>
    );
}

export default CouncilChart;
