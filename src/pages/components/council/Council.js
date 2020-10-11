import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectCode } from "../Common";
import SelectCollege from "../SelectCollege";
import CouncilChart from "./CouncilChart";
import CouncilList from "./CouncilList";
import CouncilCarousel from "./CouncilCarousel";
import CouncilButton from "./CouncilButton";
import "../css/HeaderPoster.css";
import "../css/CouncilSelect.css"

const CouncilPoster = require("../../../img/Council.png")

const Council = (props) => {
    const dispatch = useDispatch();
    const voteCandidate = useSelector((state) => state.voteCandidate);

    useEffect(() => {
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
                <SelectCollege dataDispatch={dataDispatch}></SelectCollege>
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
