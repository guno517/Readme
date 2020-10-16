import React from 'react';
import '../css/CouncilList.css'
import '../css/HeaderPoster.css'

const councilListPoster = require("../../../img/CouncilList.png")

const CouncilList = () => {
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
                    공약 전체 목록
                </div>
                <div className="councilContentRight">
                    이행 완료 목록
                </div>
            </div>
        </div>
    );
};

export default CouncilList;