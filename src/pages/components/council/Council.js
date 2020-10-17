import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectCode } from "../Common";
import SelectCollege from "./CouncilSelect";
import CouncilChart from "./CouncilChart";
import CouncilList from "./CouncilListButton";
import CouncilCarousel from "./CouncilCarousel";
import CouncilButton from "./CouncilButton";
import "../css/HeaderPoster.css";
import "../css/CouncilSelect.css"

const CouncilPoster = require("../../../img/Council.png")

const Council = (props) => {
    const dispatch = useDispatch();
    const voteCandidate = useSelector((state) => state.voteCandidate);

    useEffect(() => {
        dispatch({
            type:'UPDATE_MENU',
            id:1,
            name:"학생회"
        })
        fetchSelectCode(dispatch);
    });

    const dataDispatch = (college, major) => {
        console.log(document.querySelector("#major").value);
    };

    const state = useSelector((state) => state.voteMenu);

    return (
        <div>
            <img id="NoticePoster" src={CouncilPoster} alt="학생회 이미지"></img>
            <div>
                <SelectCollege dataDispatch={dataDispatch} />
            </div>
            <div>
                <CouncilChart />
            </div>
            <div>
                <CouncilList />
            </div>
            <div>
                <CouncilCarousel />
            </div>
            <div>
                <CouncilButton />
            </div>
        </div>
    );
};

export default Council;
