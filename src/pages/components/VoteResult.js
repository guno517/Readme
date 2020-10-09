import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import SelectCollege from "./SelectCollege";

const VoteResult = () => {

    return (
        <div className={"VoteResult"}>
            <SelectCollege></SelectCollege>
        </div>
    )
}

export default VoteResult
