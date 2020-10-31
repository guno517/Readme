import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectCode } from "../Common";
import SelectCollege from "./CouncilSelect";
import CouncilChart from "./CouncilChart";
import CouncilListButton from "./CouncilListButton";
import CouncilCarousel from "./CouncilCarousel";
import CouncilButton from "./CouncilButton";
import "../css/HeaderPoster.css";
import "../css/CouncilSelect.css";

const CouncilPoster = require("../../../img/Council.png");

const Council = (props) => {
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState([""]);
    const [carouselData, setCarouselData] = useState([""]);
    const voteCandidate = useSelector((state) => state.voteCandidate);

    useEffect(() => {
        dispatch({
            type: "UPDATE_MENU",
            id: 1,
            name: "학생회",
        });
        fetchSelectCode(dispatch);
    });

    const dataDispatch = () => {
        const collegeData = document.getElementById("college").value;
        const majorData = document.getElementById("major").value;
        fetchDataApi(collegeData, majorData);
    };

    const fetchDataApi = async (collegeData, majorData) => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/${collegeData}/${majorData}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setChartData(data.council[0][0]);
                    setCarouselData(data.council[1]);
                });
            } else {
                console.log("server error");
            }
        });
    };

    useEffect(() => {
        fetchDataApi(0, 0);
    }, []);

    const state = useSelector((state) => state.voteMenu);

    return (
        <div>
            <img id="NoticePoster" src={CouncilPoster} alt="학생회 이미지"></img>
            <div>
                <SelectCollege dataDispatch={dataDispatch} />
            </div>
            <div>
                <CouncilChart chartData={chartData} />
            </div>
            <div>
                <CouncilListButton collegeData={chartData.collegeId} majorData={chartData.deptId} />
            </div>
            <div>
                <CouncilCarousel carouselData={carouselData} />
            </div>
            <div>
                <CouncilButton collegeData={chartData.collegeId} majorData={chartData.deptId} />
            </div>
        </div>
    );
};

export default Council;
