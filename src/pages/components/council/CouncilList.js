import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../css/CouncilList.css";
import "../css/HeaderPoster.css";

const councilListPoster = require("../../../img/CouncilList.png");

const CouncilList = (props) => {
    const [listData, setListData] = useState([""]);
    const [fulfillData, setFulfillData] = useState([""]);
    const collegeData = props.match.params.college;
    const majorData = props.match.params.major;

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
            <div className="councilListTitle">
                <div className="councilTitleLeft">
                    <strong>공약 전체 목록</strong>
                </div>
                <div className="councilTitleRight">
                    <strong>이행 완료 목록</strong>
                </div>
            </div>
            <div className="councilListContent">
                <div className="councilContentLeft">
                    {listData.map((data, index) => (
                        <div>
                            <p style={{textDecoration: data.fulfillment === "T" && "line-through"}} >
                                [{index+1}] {listData[index].pledge_title}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="councilContentRight">
                    {fulfillData.map((data, index) => (
                        <div key={index}>
                            <Link to={`/council_detail/${data.collegeId}/${data.deptId}/${data.index}`}>
                                <p>
                                    [{index+1}] {data.pledge_title}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CouncilList;
