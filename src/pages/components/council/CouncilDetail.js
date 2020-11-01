import React, { useState, useEffect } from "react";
import "../css/NoticeDetail.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

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
    const [authority, setAuthority] = useState("");

    useEffect(() => {
        setAuthority(window.sessionStorage.getItem("authority"));
    }, []);

    const fetchApi = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/list/${deptId}/${collegeId}/${detail}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setCouncilDetail(data.fulfilled_list[0]);
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

    useEffect(() => {
        if (isLoading) {
            document.querySelector("#pledge_content").innerHTML = text;
        } else {
            document.querySelector("#pledge_content").innerHTML = "<p>loading...</p>";
        }
    }, [isLoading]);

    const deleteCouncil = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/delete`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deptId:deptId,
                collegeId:collegeId,
                index:detail,
                title:councilDetail.pledge_title         
            })
        }).then((response) => {
            if (response.status === 200) {
                alert("게시글이 삭제 되었습니다.");
            } else {
                alert("오류가 발생했습니다. 관리자에게 문의하세요.");
            }
        });
        window.history.back();
    };

    let text = councilDetail.pledge_content;

    return (
        <div>
            <img id="NoticePoster" src={NoticePoster}></img>
            <br></br>
            <div style={{ fontSize: "18px" }} id="NoticeContent">
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
                    <div className="council_tableHeader">
                        <span>제목</span>
                        <span>{councilDetail.pledge_title}</span>
                    </div>
                    <div className="council_tableHeader">
                        <span>작성자</span>
                        <span>{councilDetail.writer}</span>
                    </div>
                    <div className="council_tableHeader">
                        <span>이행 완료 일자</span>
                        <span>{String(councilDetail.fulfilled_date).substr(0, 10)}</span>
                    </div>
                    <div className="council_tableHeader">
                        <span>작성 일자</span>
                        <span>{String(councilDetail.time).substr(0, 10)}</span>
                    </div>
                    <div id="pledge_content">{councilDetail.pledge_content}</div>
                    <div id="NoticeFooter">
                        <Link to={"/council/"}>
                            <Button id="Button" className={classes.button} variant="contained">
                                목록
                            </Button>
                        </Link>
                        {authority === "0" && (
                            <Button onClick={deleteCouncil} id="Button" className={classes.button} variant="contained">
                                삭제
                            </Button>
                        )}
                    </div>
                </LoadingOverlay>
            </div>
        </div>
    );
};

export default CouncilDetail;
