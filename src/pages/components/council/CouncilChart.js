import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectCode } from "../Common";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

const CouncilChart = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "UPDATE_MENU",
            id: 1,
            name: "학생회",
        });
        fetchSelectCode(dispatch);
    });



    // const collegeDate = document.querySelector("#college").value;
    // let majorData = major.value;

    // let collegeValue = document.querySelector("#college").value = 0;
    // let majorValue = document.querySelector("#major").value = 0;

    
    const chartRate1 = props.chartData.total_pledge - props.chartData.fulfilled_pledge;
    const chartRate2 = props.chartData.fulfilled_pledge;

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
