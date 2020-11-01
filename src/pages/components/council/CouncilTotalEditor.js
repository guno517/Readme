import React, { useState, useEffect, useRef } from "react";
import { DataListAdd } from '../Common';

const CouncilTotalEditor = () => {
    const [council, setcouncil] = useState("");
    const [councilList, setcouncilList] = useState([]);
    const councilInput = useRef();

    const councilChange = (e) => {
        setcouncil(e.target.value);
    };

    let council_ = councilList.join("#");

    const councilDataAdd = () => {
        if (council === "") {
            alert("공백을 입력하실 수 없습니다.");
        }
        setcouncilList(councilList.concat(council));
        setcouncil("");
        councilInput.current.focus();
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            councilDataAdd();
        }
    };
    
    return (
        <>
            <DataListAdd
                className={"council"}
                title={"공약"}
                refs={councilInput}
                value={council}
                changeEvent={councilChange}
                pressEvent={handleKeyPress}
                name={"council"}
                placeholder={"공약을 입력하세요"}
                clickEvent={councilDataAdd}
                listName={councilList}
            ></DataListAdd>
        </>
    );
};

export default CouncilTotalEditor;