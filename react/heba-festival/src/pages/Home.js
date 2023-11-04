import React,{ Component, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import secureLocalStorage from "react-secure-storage";
import ServerModal from "components/Modal/ServerModal";
import "styles/common.scss";
import "styles/Home.scss";
import Table from "components/Table";
import Dashed from "assets/images/dashed.svg";
import HomeImg from "assets/images/home.svg";
import AlarmImg from "assets/images/alarm.svg";
import RedAlarmImg from "assets/images/RedAlarm.svg";
import SendHeartImg from "assets/images/SendHeart.svg";
import TimeImg from "assets/images/time.svg";
import CallServerImg from "assets/images/server.svg";
import HeartChargeImg from "assets/images/chargeHeart.svg";
import OrderImg from "assets/images/order.svg";
import MyPageImg from "assets/images/myPage.svg";
import KeyImg from "assets/images/Key.svg";
import HeartChargeModal from "components/Modal/HeartChargeModal";
import MyPageModal from "components/Modal/MyPageModal";
// TODO: 하트를 받을 시 해당 모달 팝업
import ReceivedHeartModal from "components/Modal/ReceivedHeartModal";
// TODO: 헌팅 성공 시 해당 모달 팝업
import HuntingSuccessModal from "components/Modal/HuntingSucessModal"; 

import AlarmModal from "components/Modal/Alarm/AlarmModal";

const Home = () => {
  const [isOpenServerModal, setIsOpenServerModal] = useState(false);
  const [isOpenHeartChargeModal, setIsOpenHeartChargeModal] = useState(false);
  const [isOpenMyPageModal, setIsOpenMyPageModal] = useState(false);
  const [isOpenAlarmModal, setIsOpenAlarmModal] = useState(false);
  const [filter, setFilter] = useState('all'); // 기본 필터는 전체

  // TODO: 알람 상태 확인을 위한 임시 코드, 알람이 있으면 빨간색 알람 이미지로 전환
  const [alarms, setAlarms] = useState([]);

  let myTableInfo = null;
  let likes = 0;
  let remainedTime = 0;

  let timerIntervalId = null;

  const setMyTableInfo = (tableData) => {
    if (tableData == null) return

    myTableInfo = tableData;

    if (timerIntervalId) clearInterval(timerIntervalId);

    remainedTime = (new Date(myTableInfo.end_time).getTime() - new Date()) / 1000;
    likes = myTableInfo.likes;

    timerIntervalId = setInterval(() => {
      remainedTime = remainedTime - 1;
    }, 1000);

    if (remainedTime <= 0) {
      clearInterval(timerIntervalId);
      remainedTime = 0;
    }
  }

  useEffect(() => {
    return () => clearInterval(timerIntervalId);
  },[])
  

  const navigate = useNavigate();

  function getHuntingState(data) {
    if (myTableInfo.received.includes(data.table_no)) {
      return "received";
    } else if (myTableInfo.sent.includes(data.table_no)) {
      return "sent";
    } else if (myTableInfo.rejected.includes(data.table_no) || data.rejected.includes(myTableInfo.table_no)) {
      return "broken";
    }
    return "";
  }

  function transformTableArray(datas) {
    // 이게 여기가 아니면 동작을 안해서 일단 임시로 여기 넣어둠...
    // 이거 위치 수정하다 2시간 넘게 썼으니 수정 시 유의.. 
    setMyTableInfo(datas.find((elem) => elem.table_no === secureLocalStorage.getItem('table_no')));
    const transformTableData = (data) => <Table tableNumber={data.table_no} gender={data.gender} headCount={data.nums} tableIntro={data.note} huntingSuccess={data.join} huntingStatus={getHuntingState(data)}  remainedLikes={myTableInfo.likes}/>
    return datas.map((data) => transformTableData(data));
  }

  const token = secureLocalStorage.getItem('token');
  const code = secureLocalStorage.getItem('code');
  const queryclient = useQueryClient();
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['get-all'],
    queryFn: async () => {
      const response = await fetch('http://150.230.252.177:5000/get-all', {
        mode: 'cors',
	method: 'POST',
	headers: {'Content-Type': 'application/json',},
	body: JSON.stringify({
	  'token': token,
	  'code': code,
	}),
      })
      .then((res) => res.json())
      console.log(response);
      return response;
    },
    select: (data) => {
      if (data.result && data.result !== 'fail') {
        return transformTableArray(data.result);
      } else {
	navigate('/error');
	return [];
      }
    },
    refetchInterval: 1000, // data refetch for every 1 sec.
    refetchIntervalInBackground: true,
    initialData: () => {
      return Array.from({ length: 35 }, (_, i) => <Table tableNumber={i + 1} gender="" headCount={"0"}/>);
    },
  });

  const onClickButton = (modalType) => {
    if (modalType === "server") {
      setIsOpenServerModal(true);
    } else if (modalType === "heartCharge") {
      setIsOpenHeartChargeModal(true);
    } else if (modalType === "myPage") {
      setIsOpenMyPageModal(true);
    } else if (modalType === "alarm") {
      setIsOpenAlarmModal(true);
    }
  };

  const onCloseModal = (modalType) => {
    if (modalType === "server") {
      setIsOpenServerModal(false);
    } else if (modalType === "heartCharge") {
      setIsOpenHeartChargeModal(false);
    } else if (modalType === "myPage") {
      setIsOpenMyPageModal(false);
    } else if (modalType === "alarm") {
      setIsOpenAlarmModal(false);
    }
  };

  if (isLoading) {
    console.log("loading...");
    return <div> loading... </div>;
  }
  if (error) {
    console.log(data);
    console.log(error);
    navigate('/error');
  }


  return (
    <div>
      <div id="wrapper">
        <header>
          <nav>
            <Link to={"/landing"}>
              <img className="landing" src={HomeImg} alt="homepage img"></img>
            </Link>   
            <span>바른주점</span>
            {/* TODO: 알람 상황별로  display */}
            <button className="alarmBtn" onClick={() => onClickButton("alarm")}>
              <img className="alarmImg" src={alarms.length > 0 ? RedAlarmImg : AlarmImg} alt="alarm img"></img>
            </button>
            {isOpenAlarmModal && (
            <AlarmModal open={isOpenAlarmModal} onClose={() => onCloseModal("alarm")}></AlarmModal>
          )} 
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
            </div>
            <div id="statusWindow">
              <div className="showEnterCode">
                <img src={KeyImg} alt="key img"></img>
                <span>{code}</span>
              </div>
              <div className="leftoverHeart">
                <img src={SendHeartImg} alt="sendHeart img"></img>
                <span className="heartMultiple">X</span>
                <span>{likes}</span>
              </div>
              <div className="leftoverTime">
                <img src={TimeImg} alt="time img"></img>
                <span>{String(Math.floor(remainedTime/60)).padStart(2, '0')}:{String(Math.floor(remainedTime%60)).padStart(2,'0')}</span>
              </div>
            </div>
          </div>
        </header>
        <main id="container">
	   {React.Children.toArray(data).filter(table => filter === 'all' || table.props.gender === filter)}
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
            <Link to={"https://order.sicpama.com/?token="+token} className="orderLink">
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
