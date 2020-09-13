import React, {useState} from "react";
import MainPoster from "./components/MainPoster"
import MainNotice from "./components/MainNotice"
import MainCouncilPreview from "./components/MainCouncilPreview"
const Main = () => {
    return(
        <div>
            <MainPoster></MainPoster>
            <MainNotice></MainNotice>
            <MainCouncilPreview></MainCouncilPreview>
        </div>
    )
}

export default Main;