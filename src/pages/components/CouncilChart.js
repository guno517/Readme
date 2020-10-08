import React from "react";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

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
            name: "Brands",
            colorByPoint: true,
            data: [
                {
                    name: "공약 개수",
                    y: 61.41,
                },
                {
                    name: "이행 완료",
                    y: 11.84,
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
