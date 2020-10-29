import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../css/CouncilList.css";
import "../css/HeaderPoster.css";

const councilListPoster = require("../../../img/CouncilList.png");

const CouncilList = (props) => {
    const [listData, setListData] = useState([""]);
    const [trueData, setTrueData] = useState([""]);
    let collegeData = props.match.params.collegeData;
    let majorData = props.match.params.majorData;

    const fetchApi = async (collegeData, majorData) => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/list/${collegeData}/${majorData}`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setListData(data.deptlist[1]);
                });
            } else {
                console.log("server error");
            }
        });
    };

    useEffect(() => {
        fetchApi(0, 0);
    }, []);

    console.log(listData);

    console.log(collegeData);

    let councilListData;

    // councilListData = listData.map((data, index) => {
    //     let trueData;
    //     let falseData;
    //     if(listData[index].fulfillment === 'T') {
    //         trueData =
    //         <div>
    //             <p>
    //             [{listData[index].index}] {listData[index].pledge_title}
    //             </p>
    //         </div>
    //     }

    //     if(listData[index].fulfillment === 'F'){
    //         falseData =
    //         <div>
    //             <p>
    //             [{listData[index].index}] {listData[index].pledge_title}
    //             </p>
    //         </div>
    //     }
    // })

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
                            <p>
                                [{listData[index].index}] {listData[index].pledge_title}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="councilContentRight">
                    {listData.map((data, index) => (
                        <div>
                            <p>
                                [{listData[index].index}] {listData[index].pledge_title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CouncilList;
