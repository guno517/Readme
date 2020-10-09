import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CouncilChart from "./CouncilChart";
import CouncilCarousel from "./CouncilCarousel";
import CouncilButton from "./CouncilButton";

const Council = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "UPDATE_MENU",
            id: 1,
            name: "학생회",
        });
    });
    return (
        <div>
            <div>
                드롭박스
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