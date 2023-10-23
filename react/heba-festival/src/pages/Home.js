import React from "react";
import { Link } from "react-router-dom";
import "styles/common.scss";
import "styles/Home.scss";
import Table from "components/Table";
import HomeImg from "assets/images/home.svg";
import AlarmImg from "assets/images/alarm.svg";
import HeartImg from "assets/images/heart.svg";
import TimeImg from "assets/images/time.svg";

export const Home = () => {
  
  return (
    <div id="wrapper">
      <header>
        <nav>
          <Link to={"/landing"}>
            <img className="landing" src={HomeImg} alt="homepage img"></img>
          </Link>
          <span>Table 4</span>
          <img className="alarmImg" src={AlarmImg} alt="alarm img"></img>
        </nav>
        <div id="subNav">
          <div className="subBtn">
            <button className="all">전체</button>
          </div>
          <div className="subBtn">
            <button className="female">여자만</button>
          </div>
          <div className="subBtn">
            <button className="male">남자만</button>
          </div>
          <div className="subBtn leftoverHeart">
            <img src={HeartImg} alt="heart img"></img>
            <span>x3</span>
          </div>
          <div className="subBtn leftoverTime">
            <img src={TimeImg} alt="time img"></img>
            <span>90:00</span>
          </div>
        </div>
      </header>
      <main id="container">
        <Table />
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item">4</div>
        <div className="item">5</div>
        <div className="item">6</div>
        <div className="item">7</div>
        <div className="item">8</div>
        <div className="item">9</div>
        <div className="item">10</div>
        <div className="item">11</div>
        <div className="item">12</div>
        <div className="item">13</div>
        <div className="item">14</div>
        <div className="item">15</div>
        <div className="item">16</div>
        <div className="item">17</div>
        <div className="item">18</div>
        <div className="item">19</div>
        <div className="item">20</div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>

      </main>
      <footer>
        <button className="callServer">직원호출</button>
        <button className="chargeHeart">하트충전</button>
        <button className="order">주문하기</button>
        <button className="myPage">마이페이지</button>
      </footer>
    </div>
  )
}