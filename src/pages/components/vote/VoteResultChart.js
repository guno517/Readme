import React, {useState, useEffect} from 'react';
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

const VoteResultChart = (props) => {
    const listdata = props.listdata;
    const options = {
        chart: {
            type: "pie",
        },
        credits: {
            enabled: false,
        },
        title: {
            text: "투표결과",
        },
        series: [
            {
                name: "득표",
                colorByPoint: true,
                
                data:listdata.map((candidate)=>(
                    {
                        name: "기호 "+candidate.number+"번",
                        y: candidate.votes
                    }
                ))
            },
        ],
    };
    // 무효표 추가를 위해
    options.series[0].data.push(
        {
            name: "무효표",
            y: listdata[0].invalid
        },
        {
            name: "기권",
            y: listdata[0].nonVotes
        }
    )

    return (
        <div className="vote_result_chart_wrap">
            <PieChart highcharts={Highcharts} options={options}></PieChart>
        </div>
    )
}

export default VoteResultChart