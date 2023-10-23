import React from "react";
import { Link } from "react-router-dom";
import "styles/common.scss";
import "styles/Landing.scss";
import Order from "assets/images/order.png";
import Hunt from "assets/images/hunt.png";

export const Landing = () => {
  return (
    <div className="homeWrap">
      <div className="homeTitle">
        <span>
          바른생각
          <br></br>
          바른주점
        </span>
      </div>
      <div className="homeSubtitle">
        <span>당신의 운명을 찾아보세요.</span>
      </div>
      <div className="homeBtnContainer">
        <button className="linkSicpama">
          <Link to ={"/home"} style={{textDecorationLine: "none"}}>
            <div className="homeBtnTitle">
              <span>주문하기</span>
              <img src={Order} alt="order img"></img>
            </div>
          </Link>
        </button>
        <button className="linkHEBA">
          <Link to={"/home"} style={{textDecorationLine:"none"}}>
            <div className="homeBtnTitle">
              <span>헌팅하기</span>
              <img src={Hunt} alt="hunt img"></img>
            </div>
          </Link>
        </button>
      </div>
    </div>
  
  )
}