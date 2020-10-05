import React, { useState, useEffect } from "react";
import "./css/NoticeDetail.css";

const NoticeDatail = ( props ) => {
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
            <div>
                <dt>index</dt>
                <dd>{noticeData[0].index}</dd>
                <dt>title</dt>
                <dd>{noticeData[0].title}</dd>
                <dt>writer</dt>
                <dd>{noticeData[0].writer}</dd>
                <dt>time</dt>
                <dd>str.substr({noticeData[0].time}</dd>
                <dt>content</dt>
                <dd>{noticeData[0].content}</dd>
            </div>
        </div>
    )
}

export default NoticeDatail;