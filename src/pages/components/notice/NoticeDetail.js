import React, { useState, useEffect } from "react";
import "../css/NoticeDetail.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#5CACF2",
        color: "white",
    },
}));

const NoticeDetail = (props) => {
    const classes = useStyles();
    const NoticePoster = require("../../../img/Notice.png");
    const [noticeData, setNoticeData] = useState([""]);
    const [isLoading, setIsLoading] = useState(false);
    const path_id = props.match.params.id;
    const [authority, setAuthority] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setAuthority(window.sessionStorage.getItem("authority"));
        dispatch({
            type: "UPDATE_MENU",
            id: 3,
            name: "공지사항",
        });
    }, []);

    const deleteNotice = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/delete/${path_id}`, {
            method: "get",
        }).then((response) => {
            if (response.status === 200) {
                alert("게시글이 삭제되었습니다.");
            } else {
                alert("오류가 발생했습니다. 관리자에게 문의하세요.");
            }
        });
        window.history.back();
    };

    const fetchApi = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/notice/detail/${path_id}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setNoticeData(data.detail[0]);
                    setIsLoading(true);
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
        if (isLoading) {
            document.querySelector("#content").innerHTML = text;
        } else {
            document.querySelector("#content").innerHTML = "<p>loading...</p>";
        }
    }, [isLoading]);

    let text = noticeData[0].content;

    return (
        <div>
            <img id="NoticePoster" src={NoticePoster}></img>
            <br></br>
            <div id="NoticeContent">
                <LoadingOverlay
                    active={!isLoading}
                    spinner={<BounceLoader />}
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            background: "white",
                        }),
                    }}
                >
                    <div className="tableHeader">
                        <span>제목</span>
                        <span>{noticeData[0].title}</span>
                    </div>
                    <div className="tableHeader">
                        <span>조회수</span>
                        <span>{noticeData[0].view + 1}</span>
                    </div>
                    <div className="tableHeader">
                        <span>작성자</span>
                        <span>{noticeData[0].writer}</span>
                    </div>
                    <div className="tableHeader">
                        <span>작성일</span>
                        <span>{String(noticeData[0].time).substr(0, 10)}</span>
                    </div>
                    <div>{noticeData[0].img}</div>
                    <div id="content">{noticeData[0].content}</div>
                    <div id="NoticeFooter">
                        {authority === "0" && (
                            <Button onClick={deleteNotice} id="Button" className={classes.button} variant="contained">
                                삭제
                            </Button>
                        )}

                        <Link to={`/editor/update/${noticeData[0].index}`}>
                            {authority === "0" && (
                                <Button id="Button" className={classes.button} variant="contained">
                                    수정
                                </Button>
                            )}
                        </Link>
                        <Link to="/notice">
                            <Button id="Button" className={classes.button} variant="contained">
                                목록
                            </Button>
                        </Link>
                    </div>
                </LoadingOverlay>
            </div>
        </div>
    );
};

export default NoticeDetail;
