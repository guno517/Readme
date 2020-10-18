import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectCode } from "../Common";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

const CouncilChart = (props) => {
    const [chartData, setChartData] = useState([""]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "UPDATE_MENU",
            id: 1,
            name: "학생회",
        });
        fetchSelectCode(dispatch);
    });

    const dataDispatch = (college, major) => {
        const collegeDate = document.getElementById("college").value;
        const majorData = document.getElementById("major").value;
    };

    console.log(document.getElementById("college"))
    console.log(document.getElementById("major"))

    // const collegeDate = document.querySelector("#college").value;
    let major = document.getElementById("major");
    // let majorData = major.value;

    console.log(major)

    // let collegeValue = document.querySelector("#college").value = 0;
    // let majorValue = document.querySelector("#major").value = 0;

    const fetchDataApi = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/0/${major}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setChartData(data.council[0][0]);
                });
            } else {
                console.log("server error");
            }
        });
    };

    useEffect(() => {
        fetchDataApi();
    }, []);

    const chartRate1 = chartData.total_pledge - chartData.fulfilled_pledge;
    const chartRate2 = chartData.fulfilled_pledge;

    const options = {
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
}

export default CouncilChart;
