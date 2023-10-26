import React,{ Component } from "react";
import { Link } from "react-router-dom";
import ServerModal from "components/ServerModal";
import "styles/common.scss";
import "styles/Home.scss";
import "styles/CustomModal.scss";
import Table from "components/Table";
import HomeImg from "assets/images/home.svg";
import AlarmImg from "assets/images/alarm.svg";
import HeartImg from "assets/images/heart.svg";
import TimeImg from "assets/images/time.svg";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({showModal: true});
  }

  closeModal = () => {
    this.setState({showModal: false});
  }

  render() {
  const { isModalOpen } = this.state;

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
          <button className="callServer" onClick={this.openModal}>직원호출</button>
          <ServerModal show={isModalOpen} onClose={this.closeModal}></ServerModal> 
          <button className="chargeHeart">하트충전</button>
          <button className="order">주문하기</button>
          <button className="myPage">마이페이지</button>
        </footer>
      </div>
    </div>
    
  )}
}

export default Home;