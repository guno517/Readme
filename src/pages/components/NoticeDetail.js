import React, { useState, useEffect } from "react";
import "./css/NoticeDetail.css";

const NoticeDetail = ( props ) => {
    const NoticePoster = require("../../img/Notice.png");
    const [noticeData, setNoticeData] = useState([""]);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const path = props.location.pathname.split("/");
    const path_id = path[2];

    const fetchApi = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/detail/${path_id}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setNoticeData(data.detail);
                    setIsLoading(true)
                });
            } else {
                console.log("server error");
            }
        });
    };

    useEffect(() => {
        fetchApi();
    }, []);

    // 이태희 태그까지 content 출력
    useEffect(() => {
        if(isLoading){
            document.querySelector('#content').innerHTML = text
        }else{
            document.querySelector('#content').innerHTML = "<p>loading...</p>"
        }
    },[isLoading]);
    
    let text = noticeData[0].content;

    return (
        <div>
            <img id="NoticePoster" src={NoticePoster}></img>
            <div id="NoticeContent">
                <p id="Hello">제목 | {noticeData[0].title}</p>
                <p>조회수 | {noticeData[0].view}</p>
                <p>작성자 | {noticeData[0].writer}</p>
                <p>작성일 | {String(noticeData[0].time).substr(0,10)}</p>
                <p>첨부파일 | {noticeData[0].attachment}</p>
                <br></br>
                <div id="content">{noticeData[0].content}</div>
            </div>
        </div>
    );
};

export default NoticeDetail;
