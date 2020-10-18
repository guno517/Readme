import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectCode } from "../Common";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/CouncilCarousel.css";

const poster1 = require("../../../img/poster1.png");
const poster2 = require("../../../img/poster2.png");
const poster3 = require("../../../img/poster3.png");

function CouncilCarousel() {
    const [carouselData, setCarouselData] = useState([""]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "UPDATE_MENU",
            id: 1,
            name: "학생회",
        });
        fetchSelectCode(dispatch);
    });

    const fetchDataApi = async () => {
        await fetch(`http://ec2-3-34-192-67.ap-northeast-2.compute.amazonaws.com:3000/council/0/0`).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setCarouselData(data.council[2]);
                });
            } else {
                console.log("server error");
            }
        });
    };

    console.log(carouselData);

    useEffect(() => {
        fetchDataApi();
    }, []);

    console.log(carouselData[0].img);

    return (
        <div>
            <div class="carousel-wrapper">
                <Carousel showStatus={false} showThumbs={false} dynamicHeight={true} infiniteLoop useKeyboardArrows autoPlay={true}>
                    {carouselData.map((data, index) => (
                        <Link to="/council_detail">
                            <div>
                                <img src={carouselData[index].img}></img>
                                <p className="legend">{carouselData[index].pledge_title}</p>
                            </div>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default CouncilCarousel;
