import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/CouncilCarousel.css";

const poster1 = require("../../../img/poster1.png");
const poster2 = require("../../../img/poster2.png");
const poster3 = require("../../../img/poster3.png");

function CouncilCarousel() {
    return (
        <div class="carousel-wrapper">
            <Carousel showStatus={false} showThumbs={false} dynamicHeight={true} infiniteLoop useKeyboardArrows autoPlay>
                <Link>
                    <div>
                        <img src={poster1}></img>
                        <p className="legend">제목 미리보기</p>
                    </div>
                </Link>
                <div>
                    <img src={poster2}></img>
                    <p className="legend">제목 미리보기</p>
                </div>
                <div>
                    <img src={poster3}></img>
                    <p className="legend">제목 미리보기</p>
                </div>
                <div>
                    <img src={poster1}></img>
                    <p className="legend">제목 미리보기</p>
                </div>
                <div>
                    <img src={poster2}></img>
                    <p className="legend">제목 미리보기</p>
                </div>
                <div>
                    <img src={poster3}></img>
                    <p className="legend">제목 미리보기</p>
                </div>
            </Carousel>
        </div>
    );
}

export default CouncilCarousel;