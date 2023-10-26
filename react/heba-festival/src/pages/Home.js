import React,{ Component } from "react";
import { Link } from "react-router-dom";
import "styles/common.scss";
import "styles/Home.scss";
import "styles/CustomModal.scss";
import Table from "components/Table";
import CustomModal from "components/CustomModal";
import HomeImg from "assets/images/home.svg";
import AlarmImg from "assets/images/alarm.svg";
import HeartImg from "assets/images/heart.svg";
import TimeImg from "assets/images/time.svg";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalContent: [],
    };
  }

  openModal = (content) => {
    this.setState({isModalOpen: true, modalContent: content});
  };

  closeModal = () => {
    this.setState({isModalOpen: false, modalContent: []});
  };
  
  render() {
    const { isModalOpen, modalContent } = this.state;

  return (
    <div>
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
          <button className="callServer" onClick={this.openModal([
            {
              title: '직원 호출',
              description: '직원을 호출하시겠습니까?',
            },
          ])
          }>
            직원호출
          </button>
          <CustomModal isOpen={this.state.isModalOpen} closeModal={this.closeModal}>
            <div className="callServerModal modalBox">
              {modalContent.map((box, index) => (
                <div key={index}>
                  <div className="modalTitle">
                    <span>{box.title}</span>
                  </div>
                  <div className="modalContainer">
                    <span>{box.description}</span>
                  </div>
                </div>
              ))}
              <button onClick={this.closeModal}>직원호출</button>
            </div>
          </CustomModal>
          <button className="chargeHeart" onClick={this.openModal}>하트충전</button>
          <CustomModal isOpen={this.state.isModalOpen} closeModal={this.closeModal}>
            <div className="chargeHeartModal modalBox">
              <div className="modalTitle">
                <span>하트 충전하기</span>
              </div>
              <div className="modalContainer" style={{paddingTop: '2rem'}}>
                <span style={{fontSize: '1rem'}}>
                  하트는 칩 4개로 구매 가능합니다.
                  <br></br>
                  칩이 있으시면 '직원 호출'을,
                  <br></br>
                  칩이 없으시면 '주문하기'를 클릭해
                  <br></br>
                  칩을 구매해 주세요.
                </span>
              </div>
            </div>
          </CustomModal>
          <button className="order">주문하기</button>
          <button className="myPage">마이페이지</button>
        </footer>
      </div>
    </div>
    
  )}
}

export default Home;