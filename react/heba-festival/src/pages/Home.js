import React,{ Component } from "react";
import { Link } from "react-router-dom";
import ServerModal from "components/Modal/ServerModal";
import "styles/common.scss";
import "styles/Home.scss";
import Table from "components/Table";
import Dashed from "assets/images/dashed.svg";
import HomeImg from "assets/images/home.svg";
import AlarmImg from "assets/images/alarm.svg";
import SendHeartImg from "assets/images/SendHeart.svg";
import TimeImg from "assets/images/Time.svg";
import CallServerImg from "assets/images/server.svg";
import HeartChargeImg from "assets/images/chargeHeart.svg";
import OrderImg from "assets/images/order.svg";
import MyPageImg from "assets/images/myPage.svg";
import HeartChargeModal from "components/Modal/HeartChargeModal";
import MyPageModal from "components/Modal/MyPageModal";
import HuntingSuccessModal from "components/Modal/HuntingSucessModal";


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
              <img src={SendHeartImg} alt="heart img"></img>
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
          <button className="callServer" onClick={() => this.onClickButton("server")}>
            <div className="btnBox">
              <img src={CallServerImg} style={{width: '2.2rem', height: '2.2rem', marginBottom: '0.2rem'}}></img>
              <span>직원호출</span>
            </div>
            <img src={Dashed}></img>
          </button>
          {this.state.isOpenServerModal && (
            <ServerModal open={this.state.isOpenServerModal} onClose={() => this.onCloseModal("server")}></ServerModal>
          )} 
          <button className="chargeHeart" onClick={() => this.onClickButton("heartCharge")}>
            <div className="btnBox">
              <img src={HeartChargeImg} style={{width: '3rem', height: '1.6rem', marginTop: '0.3rem',marginBottom: '0.5rem'}}></img>
              <span>하트충전</span>
            </div>
            <img src={Dashed}></img>
          </button>
          {this.state.isOpenHeartChargeModal && (
            <HeartChargeModal open={this.state.isOpenHeartChargeModal} onClose={() => this.onCloseModal("heartCharge")}></HeartChargeModal>
          )} 
          <button className="order">
            <Link to={"/landing"} className="orderLink">
              <div className="btnBox" style={{display: 'flex', width: '100%'}}>
                <img src={OrderImg} style={{width:'3rem', height:'2.2rem', marginBottom: '0.2rem'}}></img>
                <span>주문하기</span>
              </div>
            </Link>  
            <img src={Dashed} style={{ width:'0.1rem', float:'right'}}></img> 
          </button>
          <button className="myPage" onClick={() => this.onClickButton("myPage")}>
            <div className="btnBox">
              <img src={MyPageImg} style={{width: '2rem', height: '2rem',marginTop: '0.1rem', marginBottom: '0.3rem'}}></img>
              <span>마이페이지</span>
            </div>         
          </button>
          {this.state.isOpenMyPageModal && (
            <MyPageModal open={this.state.isOpenMyPageModal} onClose={() => this.onCloseModal("myPage")}></MyPageModal>
          )} 
        </footer>
      </div>
    </div>
    
  )}
}

export default Home;