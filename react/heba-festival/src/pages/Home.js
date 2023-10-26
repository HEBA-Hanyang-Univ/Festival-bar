import React,{ Component } from "react";
import { Link } from "react-router-dom";
import ServerModal from "components/Modal/ServerModal";
import "styles/common.scss";
import "styles/Home.scss";
import Table from "components/Table";
import HomeImg from "assets/images/home.svg";
import AlarmImg from "assets/images/alarm.svg";
import HeartImg from "assets/images/heart.svg";
import TimeImg from "assets/images/time.svg";
import HeartChargeModal from "components/Modal/HeartChargeModal";
import MyPageModal from "components/Modal/MyPageModal";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenServerModal: false,
      isOpenHeartChargeModal: false,
      isOpenMyPageModal: false,
    };
  }

  onClickButton = (modalType) => {
    if (modalType === "server") {
      this.setState({ isOpenServerModal: true });
    } else if (modalType === "heartCharge") {
      this.setState({ isOpenHeartChargeModal: true });
    } else if (modalType === "myPage") {
      this.setState({ isOpenMyPageModal: true });
    }
  };

  onCloseModal = (modalType) => {
    if (modalType === "server") {
      this.setState({ isOpenServerModal: false });
    } else if (modalType === "heartCharge") {
      this.setState({ isOpenHeartChargeModal: false });
    } else if (modalType === "myPage") {
      this.setState({ isOpenMyPageModal:false });
    }
  };

  render() {

  return (
    <div>
      <div id="wrapper">
        <header>
          <nav>
            <Link to={"/landing"}>
              <img className="landing" src={HomeImg} alt="homepage img"></img>
            </Link>   
            <span>바른주점</span>
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
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
          <Table />
        </main>
        <footer>
          <button className="callServer" onClick={() => this.onClickButton("server")}>직원호출</button>
          {this.state.isOpenServerModal && (
            <ServerModal open={this.state.isOpenServerModal} onClose={() => this.onCloseModal("server")}></ServerModal>
          )} 
          <button className="chargeHeart" onClick={() => this.onClickButton("heartCharge")}>하트충전</button>
          {this.state.isOpenHeartChargeModal && (
            <HeartChargeModal open={this.state.isOpenHeartChargeModal} onClose={() => this.onCloseModal("heartCharge")}></HeartChargeModal>
          )} 
          <button className="order">  
            <Link style={{textDecoration: 'none', color:'#fff'}} to={"/landing"}>주문하기
            </Link>  
          </button>
          <button className="myPage" onClick={() => this.onClickButton("myPage")}>마이페이지</button>
          {this.state.isOpenMyPageModal && (
            <MyPageModal open={this.state.isOpenMyPageModal} onClose={() => this.onCloseModal("myPage")}></MyPageModal>
          )} 
        </footer>
      </div>
    </div>
    
  )}
}

export default Home;