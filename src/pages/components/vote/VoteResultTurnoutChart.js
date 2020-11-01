import React from 'react'
import Highcharts from "highcharts/highstock";
import LineChart from "highcharts-react-official";

const VoteResultTurnoutChart = (props) => {
    const listdata = props.listdata[0];
    const options = {
        chart: {
            type: "line",
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "투표 참여율",
        },
        xAxis: {
            categories: ['1일차 오전', '1일차 오후', '1일차 오전', '2일차 오후', '3일차 오전', '3일차오후']
        },
        series: [{
            name: '누적 투표자 수',
            data: listdata && [listdata.day1_1,listdata.day1_2,listdata.day2_1, listdata.day2_2, listdata.day3_1, listdata.day3_2]
        }],
        responsive: {
            rules: [{
                condition: {
                    overFlow:'unset'

                },
            }
        ]}

    };
    return (
        <div className="vote_result_turnout_chart_wrap">
            <LineChart highcharts={Highcharts} options={options}></LineChart>
        </div>
    )
}

export default VoteResultTurnoutChart
