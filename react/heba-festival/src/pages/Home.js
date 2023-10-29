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
import TimeImg from "assets/images/time.svg";
import CallServerImg from "assets/images/server.svg";
import HeartChargeImg from "assets/images/chargeHeart.svg";
import OrderImg from "assets/images/order.svg";
import MyPageImg from "assets/images/myPage.svg";
import HeartChargeModal from "components/Modal/HeartChargeModal";
import MyPageModal from "components/Modal/MyPageModal";
import HuntingSuccessModal from "components/Modal/HuntingSucessModal";
import SendHeartModal from "components/Modal/SendHeartModal";


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // 하단바 모달
      isOpenServerModal: false,
      isOpenHeartChargeModal: false,
      isOpenMyPageModal: false,

      // 하트 보냄
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
            <div id="subNavFilter">
              <div className="filterBtn">
                <button className="allFilter filterActive" on>
                  <span>전체</span>
                </button>
              </div>
              <div className="filterBtn">
                <button className="womanFilter">
                  <span>여자</span>
                </button>
              </div>  
              <div className="filterBtn">
                <button className="manFilter">
                  <span>남자</span>
                </button>
              </div>
              <div className="filterBtn">
                <button className="coupleFilter">
                  <span>혼성</span>
                </button>
              </div>
            </div>
            <div id="statusWindow">
              <div className="leftoverHeart">
                <img src={SendHeartImg}></img>
                <span className="heartMultiple">X</span>
                {/* TODO: 자신의 테이블에서 보낼 수 있는 하트 개수 표시하기 */}
                <span>4</span>
              </div>
              <div className="leftoverTime">
                <img src={TimeImg}></img>
                {/* 서버에서 입장과 동시에 90분 타이머 가동 */}
                <span>90:00</span>
              </div>
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