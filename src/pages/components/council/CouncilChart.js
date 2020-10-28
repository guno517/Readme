import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

const CouncilChart = (props) => {
    const [chartData, setChartData] = useState([""]);
    const [chartRate1, setChartRate1] = useState(0);
    const [chartRate2, setChartRate2] = useState(0);
    // const {dataDispatch} = props
    // const dispatch = useDispatch()
    // const allSelectList = useSelector(state => state.selectAll)
    // const collegeSelectList = useSelector(state => state.selectCollege)
    // const [collegeValue, setCollegeValue] = useState();
    // const [majorValue, setmajorValue] = useState();

    // // select 박스 단과대학 변경
    // const onChangeCollege = (e) =>{
    //     let college = parseInt(e.target.value);
    //     let stateFilter = allSelectList.codeTable.filter(f=>{
    //         return f.collegeId === parseInt(college);
    //     })
    //     // 하위 select 리스트
    //     dispatch({
    //         type:"FETCH_SELECT_MENU_COLLEGE",
    //         data:stateFilter
    //     })

    //     // target.value 저장
    //     dispatch({
    //         type:"SELECT_MENU_DATA",
    //         college:parseInt(college),
    //     })

    //     // 표출될 데이터 redux dispatch

    //     dataDispatch(college,0)

    //     // 하위 select (Major) value 0으로 초기화
    //     setCollegeValue(college);
    //     document.querySelector("#major").value = '0';
    // }

    // const onChangeMajor = (e) =>{
    //     let major = parseInt(e.target.value);
    //     setmajorValue(major);
    //     // target.value 저장
    //      dispatch({
    //         type:"SELECT_MENU_DATA",
    //         major:parseInt(major)
    //     })
    //     dataDispatch(collegeValue,major)
    // }

    // useEffect(()=>{
    //     // // 최초의 두번째 select option 데이터 초기값을 위해 dispatch 실행
    //     // let stateFilter = allSelectList.codeTable.filter(f=>{
    //     //     return f.collegeId === parseInt(0);
    //     // })
    //     dispatch({
    //         type:"FETCH_SELECT_MENU_COLLEGE",
    //         data:[{
    //             "index": 1,
    //             "collegeId": 0,
    //             "deptId": 0,
    //             "collegeName": "총학생회",
    //             "deptName": "총학생회"
    //           }]
    //     })
    // },[])

    // console.log(document.getElementById("college"))
    // console.log(document.getElementById("major"))

    // console.log(document.querySelector("#college option"));
    // let major = document.getElementById("major option");
    // let college = document.getElementById("college option");
    // let majorData = major.value;

    // console.log(major)

    // let collegeValue = document.querySelector("#college").value = 0;
    // let majorValue = document.querySelector("#major").value = 0;

    // console.log(useSelector((state) => state.selectFlagData.college));
    // console.log(useSelector((state)=>state.selectFlagData.major));
    // let majorCode = useSelector(state=>state.selectFlagData.major)

    const dataDispatch = (college, major) =>{
        fetchDataApi();
        console.log("test");
    }

    let collegeCode = useSelector((state) => state.selectFlagData.college);
    // let majorCode = useSelector((state) =>state.selectFlagData.major);

    const fetchDataApi = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/${collegeCode}/0`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setChartData(data.council[0][0]);
                    // console.log("test")
                });
            } else {
                console.log("server error");
            }
        });
    };

    useEffect(() => {
        fetchDataApi();
        dataDispatch(0, 0);
    }, []);

    useEffect(() => {
        setChartRate1(chartData.total_pledge - chartData.fulfilled_pledge);
        setChartRate2(chartData.fulfilled_pledge);
    }, [chartData]);

    // let chartRate1 = chartData.total_pledge - chartData.fulfilled_pledge;
    // let chartRate2 = chartData.fulfilled_pledge;

    console.log(chartRate1);
    console.log(chartRate2);

    // componentDidMount() {
    //     let chart = this.refs.chart.getChart();
    //     //chart.series[0].addPoint({x: 10, y: 12});
    
    //     // set up the updating of the chart each second
    //     var series = chart.series[0];
    //     setInterval(function () {
    //       var x = (new Date()).getTime(), // current time
    //         y = Math.random();
    //       series.addPoint([x, y], true, true);
    //     }, 1000);
    
    //   }

    const options = {
        colors: ["#7cb5ec", "#4572A7"],
        chart: {
            type: "pie",
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "공약 실천 현황",
        },
        series: [
            {
                name: "공약",
                colorByPoint: true,
                data: [
                    {
                        name: "실천 예정 공약",
                        y: chartRate1,
                    },
                    {
                        name: "이행 완료 공약",
                        y: chartRate2,
                    },
                ],
            },
        ],
    };

    return (
        <div>
            <PieChart highcharts={Highcharts} options={options}></PieChart>
        </div>
    );
};

export default CouncilChart;
