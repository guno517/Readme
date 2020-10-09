import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import SelectCollege from "./SelectCollege";

const VoteCandidate = () => {
    return(
        <div className={"VoteCandidate"}>
            <SelectCollege></SelectCollege>
        </div>
    )
}

export default VoteCandidate
