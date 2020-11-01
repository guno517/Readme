import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/CouncilList.css";
import "../css/HeaderPoster.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const councilListPoster = require("../../../img/CouncilList.png");

const useStyles = makeStyles((theme) => ({

}));

const CouncilList = (props) => {
    const classes = useStyles();
    const [listData, setListData] = useState([""]);
    const [fulfillData, setFulfillData] = useState([""]);
    const collegeData = props.match.params.college;
    const majorData = props.match.params.major;
    const [authority, setAuthority] = useState("");

    useEffect(() => {
        setAuthority(window.sessionStorage.getItem("authority"));
    }, []);

    const fetchApi = async (collegeData, majorData) => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/list/${collegeData}/${majorData}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setListData(data.deptlist[0]);
                    setFulfillData(data.deptlist[1]);
                });
            } else {
                console.log("server error");
            }
        });
    };

    useEffect(() => {
        fetchApi(collegeData, majorData);
    }, []);
    return (
        <div>
            <img id="NoticePoster" src={councilListPoster} />
            <br></br>
            <div className="councilListTitle">
                <div className="councilTitleLeft">
                    <strong>공약 전체 목록</strong>
                </div>
                <div className="councilTitleRight">
                    <strong>이행 인증 목록</strong>
                </div>
            </div>
            <div className="councilListContent">
                <div className="councilContentLeft">
                    <p style={{ color: "blue" }}>체크된 항목은 이행 완료 공약입니다.</p>
                    {listData.map((data, index) => (
                        <div key={index}>
                            <p style={{ textDecoration: data.fulfillment === "T" && "line-through" }}>
                                [{index + 1}] {listData[index].pledge_title}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="councilContentRight">
                    <p style={{ color: "blue" }}>공약을 클릭하면 상세 정보를 확인하실 수 있습니다.</p>
                    {fulfillData.map((data, index) => (
                        <div key={index}>
                            <Link to={`/council_detail/${data.collegeId}/${data.deptId}/${data.index}`}>
                                <p>
                                    [{index + 1}] {data.pledge_title}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div id="listbuttondiv" className={classes.buttondiv} style={{width:'65%', textAlign: 'right'}}>
                <Link to={"/council"}>
                    <button style={{width:'100px', height:'30px',marginRight:'1%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'#5CACF2', color:'white', borderRadius:'5px', outline:'none'}}>목록</button>
                </Link>
                <Link to={`/council_totaleditor/${collegeData}/${majorData}`}>
                    {authority === "0" && (
                        <button style={{width:'100px', height:'30px',marginRight:'1%',marginBottom:'3%', border:'1px solid rgb(130, 162, 209)', backgroundColor:'#5CACF2', color:'white', borderRadius:'5px', outline:'none'}}>공약 관리</button>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default CouncilList;
