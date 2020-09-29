import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'
import Poster from "./Poster"
import "./css/Vote.css";

const vote1 =  require("../../img/vote1.png");
const vote2 =  require("../../img/vote2.png");
const VoteInfo = () => {

    return (
        <div className={"vote_Info"}>
            <Poster class2={"vote_poster"} img={vote1}></Poster>
            <Poster class2={"vote_poster"} img={vote2}></Poster>
        </div>
    )
}

export default VoteInfo
