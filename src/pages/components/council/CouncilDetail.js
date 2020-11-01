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

    useEffect(()=>{
        if (isLoading) {
            document.querySelector("#pledge_content").innerHTML = text;
        } else {
            document.querySelector("#pledge_content").innerHTML = "<p>loading...</p>";
        }
    },[isLoading])

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
            <div style={{ fontSize:"18px" }} id="NoticeContent">
                <div>제목 | {councilDetail.pledge_title}</div>
                <div>작성자 | {councilDetail.writer}</div>
                <div>이행 완료 일자 | {String(councilDetail.fulfilled_date).substr(0, 10)}</div>
                <div>작성 일자 | {String(councilDetail.time).substr(0, 10)}</div>
                <br></br>
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
            </div>
        </div>
    );
};

export default CouncilDetail;
