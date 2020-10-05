import React, { useState, useEffect } from "react";
import "./css/NoticeDetail.css";

const NoticeDatail = (props) => {
    const NoticePoster = require("../../img/Notice.png");
    const [noticeData, setNoticeData] = useState([""]);
    const path = props.location.pathname.split("/");
    const path_id = path[2];

    const fetchApi = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/detail/${path_id}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setNoticeData(data.detail);
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
                <p id="Hello">제목 | {noticeData[0].title}</p>
                <p>조회수 | {noticeData[0].view}</p>
                <p>작성자 | {noticeData[0].writer}</p>
                <p>작성일 | {noticeData[0].time}</p>
                <p>첨부파일 | {noticeData[0].attachment}</p>
                <br></br>
                <p>{noticeData[0].img}</p>
                <p>{noticeData[0].content}</p>
            </div>
        </div>
    );
};

export default NoticeDatail;
