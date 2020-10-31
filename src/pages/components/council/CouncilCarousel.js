import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectCode } from "../Common";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/CouncilCarousel.css";

function CouncilCarousel(props) {
    const carouselData = props.carouselData;
  console.log("ASDA",carouselData)
    return (
        <div>
            <div className="carousel-wrapper">
                <Carousel showStatus={false} showThumbs={false} dynamicHeight={true} infiniteLoop useKeyboardArrows autoPlay={true}>
                    {carouselData.map((data, index) => (
                        <Link to={`/council_detail/${data.collegeId}/${data.deptId}/${data.index}`}>
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