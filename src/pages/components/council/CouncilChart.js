import React from "react";
import { useDispatch } from "react-redux";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

const CouncilChart = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const chartRate1 = props.chartData.total_pledge - props.chartData.fulfilled_pledge;
    const chartRate2 = props.chartData.fulfilled_pledge;

    const options = {
        colors: ["#7cb5ec", "#8085e9"],
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
