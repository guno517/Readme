import React, { useState, useEffect } from "react";
import "../css/NoticeDetail.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#5CACF2",
        color: "white",
    },
}));

const CouncilDetail = (props) => {
    const classes = useStyles();
    const NoticePoster = require("../../../img/CouncilDetail.png");
    const [councilDetail, setCouncilDetail] = useState([""]);
    const [isLoading, setIsLoading] = useState(false);
    let locationValue = props.location.pathname.split("/");
    const path_index = props.match.params.index;
    const deptId = locationValue[2];
    const collegeId = locationValue[3];
    const detail = locationValue[4];

    const fetchApi = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/list/${deptId}/${collegeId}/${detail}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setCouncilDetail(data.fulfilled_list[0]);
                });
            } else {
                console.log("server error");
            }
        });
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div>
            <img id="NoticePoster" src={NoticePoster}></img>
            <div id="NoticeContent">
                <div>제목 | {councilDetail.pledge_title}</div>
                <div>조회수 | {councilDetail.view}</div>
                <div>작성자 | {councilDetail.writer}</div>
                <div>작성일 | {String(councilDetail.time).substr(0, 10)}</div>
                <br></br>
                <div>
                    <img src={councilDetail.img}></img>
                </div>
                <div id="content">{councilDetail.pledge_content}</div>
                <div id="NoticeFooter">
                    <Link to={`/council_list/${deptId}/${collegeId}`}>
                        <Button id="Button" className={classes.button} variant="contained">
                            목록
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CouncilDetail;
