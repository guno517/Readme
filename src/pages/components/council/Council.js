import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CouncilChart from "./CouncilChart";
import CouncilCarousel from "./CouncilCarousel";
import CouncilButton from "./CouncilButton";
import SelectCollege from "../SelectCollege";
import { fetchSelectCode } from "../Common";

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
            <div>
                <SelectCollege dataDispatch={dataDispatch}></SelectCollege>
            </div>
            <div>
                <CouncilChart />
            </div>
            <div>공약 목록 버튼</div>
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
