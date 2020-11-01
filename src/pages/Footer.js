import React,{useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import Menu from "./components/Menu";
import "./css/Footer.css";
const Footer = (props) =>{
    return (
        <div className = {"footer"}>
            <div className = {"pc_footer"}>
                <div className={"copyright"}>
                    <ul>
                        <li>© 2020 Readme, Inc. All rights reserved</li>
                    </ul>
                </div>
                <div className={"sitemap"}>
                    <ul>
                        <li>개인정보 처리방침</li>
                        <li>이용약관</li>
                        <li>사이트맵</li>
                        <li>환불정책</li>
                    </ul>
                </div>
                <div className={"SNS"}>
                    <ul>
                        <li><a href="https://www.gachon.ac.kr/main.jsp"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWvSQ-r6RM4fjyoHDIMNgq-6LI0RGKne0pnw&usqp=CAU" width="30px" height="30px" alt="instagram"></img></a></li>
                        <li><a href="https://www.facebook.com/gachongeneralstudentcouncil/"><img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" width="30px" height="30px" alt="facebook"></img></a></li>
                        <li><a href="https://www.instagram.com/36th_gc_wind/?hl=ko"><img src="https://img.icons8.com/ios/50/000000/instagram-new.png" width="30px" height="30px" alt="instagram"></img></a></li>
                        <li><a href="https://github.com/th0532/Readme"><img src="https://img.icons8.com/material-outlined/50/000000/github.png" width="30px" height="30px" alt="instagram"></img></a></li>
                    </ul>
                </div>
            </div>
            <div className = {"mob_menu"}>
                <Menu></Menu>
            </div>
        </div>
    )
}
export default Footer;