import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CouncilList from "./CouncilList";
import "../css/CouncilButton.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    buttondiv: {
        width: "51%",
        margin: "0 auto",
        padding: "40px"
    },
    button: {
        backgroundColor: "white",
        color: "black",
    },
}));

function CouncilButton(props) {
    const classes = useStyles();
    let collegeData = props.collegeData
    let majorData = props.majorData
    return (
        <div id="buttondiv" className={classes.buttondiv}>
            <Link to={`/council_list/${collegeData}/${majorData}`}>
                <Button id="Button" className={classes.button} variant="contained">
                    공약 목록 전체 보기
                </Button>
            </Link>
        </div>
    );
}

export default CouncilButton;
