import React,{ Component, useState } from "react";
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

// class Home extends Component {



//   constructor(props) {
//     super(props);
//     this.state = {
//       // 하단바 모달
//       isOpenServerModal: false,
//       isOpenHeartChargeModal: false,
//       isOpenMyPageModal: false,

//       // 하트 보냄
//     };
//   }

//   onClickButton = (modalType) => {
//     if (modalType === "server") {
//       this.setState({ isOpenServerModal: true });
//     } else if (modalType === "heartCharge") {
//       this.setState({ isOpenHeartChargeModal: true });
//     } else if (modalType === "myPage") {
//       this.setState({ isOpenMyPageModal: true });
//     }
//   };

//   onCloseModal = (modalType) => {
//     if (modalType === "server") {
//       this.setState({ isOpenServerModal: false });
//     } else if (modalType === "heartCharge") {
//       this.setState({ isOpenHeartChargeModal: false });
//     } else if (modalType === "myPage") {
//       this.setState({ isOpenMyPageModal:false });
//     }
//   };

//   // Creating tables

//   render() {

const Home = () => {
  const [isOpenServerModal, setIsOpenServerModal] = useState(false);
  const [isOpenHeartChargeModal, setIsOpenHeartChargeModal] = useState(false);
  const [isOpenMyPageModal, setIsOpenMyPageModal] = useState(false);
  const [filter, setFilter] = useState('all'); // 기본 필터는 전체

  const onClickButton = (modalType) => {
    if (modalType === "server") {
      setIsOpenServerModal(true);
    } else if (modalType === "heartCharge") {
      setIsOpenHeartChargeModal(true);
    } else if (modalType === "myPage") {
      setIsOpenMyPageModal(true);
    }
  };

  const onCloseModal = (modalType) => {
    if (modalType === "server") {
      setIsOpenServerModal(false);
    } else if (modalType === "heartCharge") {
      setIsOpenHeartChargeModal(false);
    } else if (modalType === "myPage") {
      setIsOpenMyPageModal(false);
    }
  };

  // Creating Tables
  const tables = Array.from({ length: 40 }, (_, i) => <Table key={i + 1} tableNumber={i + 1} gender="" headCount={"0"}/>)
  
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
                <button className="allFilter filterActive" onClick={() => setFilter('all')}>
                  <span>전체</span>
                </button>
              </div>
              <div className="filterBtn">
                <button className="femaleFilter" onClick={() => setFilter('female')}>
                  <span>여자</span>
                </button>
              </div>  
              <div className="filterBtn">
                <button className="maleFilter" onClick={() => setFilter('male')}>
                  <span>남자</span>
                </button>
              </div>
              <div className="filterBtn">
                <button className="mixedFilter" onClick={() => setFilter('mixed')}>
                  <span>혼성</span>
                </button>
              </div>
            </div>
            <div id="statusWindow">
              <div className="leftoverHeart">
                <img src={SendHeartImg} alt="sendHeart img"></img>
                <span className="heartMultiple">X</span>
                {/* TODO: 자신의 테이블에서 보낼 수 있는 하트 개수 표시하기 */}
                <span>4</span>
              </div>
              <div className="leftoverTime">
                <img src={TimeImg} alt="time img"></img>
                {/* TODO: 서버에서 입장과 동시에 90분 타이머 가동 */}
                <span>90:00</span>
              </div>
            </div>
          </div>
        </header>
        <main id="container">
          {React.Children.toArray(tables).filter(table => filter === 'all' || table.props.gender === filter)}
        </main>
        <footer>
          <button className="callServer" onClick={() => onClickButton("server")}>
            <div className="btnBox">
              <img src={CallServerImg} style={{width: '2.2rem', height: '2.2rem', marginBottom: '0.2rem'}} alt="footer callServer img"></img>
              <span>직원호출</span>
            </div>
            <img src={Dashed} alt="dashed img"></img>
          </button>
          {isOpenServerModal && (
            <ServerModal open={isOpenServerModal} onClose={() => onCloseModal("server")}></ServerModal>
          )} 
          <button className="chargeHeart" onClick={() => onClickButton("heartCharge")}>
            <div className="btnBox">
              <img src={HeartChargeImg} style={{width: '3rem', height: '1.6rem', marginTop: '0.3rem',marginBottom: '0.5rem'}} alt="footer heartCharge img"></img>
              <span>하트충전</span>
            </div>
            <img src={Dashed} alt="dashed img"></img>
          </button>
          {isOpenHeartChargeModal && (
            <HeartChargeModal open={isOpenHeartChargeModal} onClose={() => onCloseModal("heartCharge")}></HeartChargeModal>
          )} 
          <button className="order">
            {/* TODO: 식파마 페이지로 이동 */}
            <Link to={"/landing"} className="orderLink">
              <div className="btnBox" style={{display: 'flex', width: '100%'}}>
                <img src={OrderImg} style={{width:'3rem', height:'2.2rem', marginBottom: '0.2rem'}} alt="footer order img"></img>
                <span>주문하기</span>
              </div>
            </Link>  
            <img src={Dashed} style={{ width:'0.1rem', float:'right'}} alt="dashed img"></img> 
          </button>
          <button className="myPage" onClick={() => onClickButton("myPage")}>
            <div className="btnBox">
              <img src={MyPageImg} style={{width: '2rem', height: '2rem',marginTop: '0.1rem', marginBottom: '0.3rem'}} alt="myPage img"></img>
              <span>마이페이지</span>
            </div>         
          </button>
          {isOpenMyPageModal && (
            <MyPageModal open={isOpenMyPageModal} onClose={() => onCloseModal("myPage")}></MyPageModal>
          )} 
        </footer>
      </div>
    </div>
  );
};


export default Home;