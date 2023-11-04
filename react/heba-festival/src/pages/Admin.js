import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "styles/Admin.css";
import Title from "assets/images/Title.svg";
import Tiger from "assets/images/Tiger.svg";
import Call from "assets/images/Call.svg";

import AdminTable from "components/Admin/AdminTable.js";
import AlarmBorder from "components/Admin/AlarmBorder.js";
import TableInfoModal from "components/Modal/AdminModal/TableInfoModal";
import TimeModal from "components/Modal/AdminModal/TimeModal";
import HeartModal from "components/Modal/AdminModal/HeartModal";
import ExitTableModal from "components/Modal/AdminModal/ExitTableModal";
import JoinTableModal from "components/Modal/AdminModal/JoinTableModal";

function Admin() {

  const [isOpenTableInfoModal, setIsOpenTableInfoModal] = useState(false);
  const [isOpenTimeModal, setIsOpenTimeModal] = useState(false);
  const [isOpenHeartModal, setIsOpenHeartModal] = useState(false);
  const [isOpenExitModal, setIsOpenExitModal] = useState(false);
  const [isOpenJoinTableModal, setIsOpenJoinTableModal] = useState(false);
  const [isMultipleSelectMode, setIsMultipleSelectMode] = useState(false);

  // a variable for render nums of each tables
  let tableNums = {
    male: 0,
    female: 0,
    mixed: 0,
    joined: 0,
    empty: 0,
  };

  // a function for processing data after fetching
  // count each table's number and calculate remained time
  function postProcessData(datas) {
    tableNums = { male:0, female:0, mixed:0, joined:0, empty:0,};
    const currentTime = new Date();

    const processIndividualData = (data) => {
      const remainedTime = (new Date(data.end_time).getTime() - currentTime) / 1000;

      if (data.join) {
	tableNums.joined += 1;
      } else if (data.gender === "male" || data.gender === "female" || data.gender === "mixed") {
	tableNums[data.gender] += 1;
      } else {
	tableNums.empty += 1;
      }

      return (
	<AdminTable tableNumber={ data.table_no } gender={ data.gender } headCount={ data.nums } 
	huntingSuccess={ data.join } remainedTime={ remainedTime } managerCall={false} onClickTable={ ()=> {} } />
      );
    }
    return datas.map((data) => processIndividualData(data));
  }

  // variables that related to data fetching
  // !!! DO NOT MODIFY !!!
  const { token } = useParams();
  const navigate = useNavigate();
  // Fetch Once for verify token
  const verifyToken = async() => {
    try {
      const response = await fetch('http://150.230.252.177:5000/check-token', {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          'token': token,
	}),
        headers: {'Content-Type': 'application/json', },
      })
      .then((res) => res.json())
      .then((res) => {
        if (data.result && data.result === 'ok' && data.table_no === 'admin') {
          alert('admin verified');
        } else {
          navigate('/error');
        }
      });
    } catch (error) {
      navigate('/error');
    }
  }
  
  useEffect(() => {
    verifyToken();
  }, []);

  // Refetch query
  const queryclient = useQueryClient();
  const{ data, isLoading, error, isFetching } = useQuery({
    queryKey : ['get-all'] ,
    queryFn: async () => {
      const response = await fetch('http://150.230.252.177:5000/get-all', {
        mode : 'cors',
        method : 'POST',
        headers : {'Content-Type': 'application/json',},
        body : JSON.stringify({
          'admin_token': token,
        }),
      })
      .then((res) => res.json())
      console.log(response);
      return response;
    },
    select : (data) => {
      if (data.result && data.result !== 'fail') {
        return postProcessData(data.result);
      } else {
        alert('data fetching failed!');
	return[];
      }
    },
    refetchInterval : 1000, // data refetch for every 1 sec.
    refetchIntervalInBackground : true,
    initialData : () => {
      return Array.from({ length: 30 }, (_, i) => <AdminTable tableNumber={ i+1 } gender="" 
                        headCount={0} friendCode="" managerCall={false} huntingSuccess={false} 
	                remainedTime={5400} />);
    },
  });
  
  // 박스 클릭시 나오는 모달창
  const onClickButton = (modalType) => {
    if (modalType === "tableInfo") {
      setIsOpenTableInfoModal(true);
    } else if (modalType === "time") {
      setIsOpenTimeModal(true);
    } else if (modalType === "heart") {
      setIsOpenHeartModal(true);
    } else if (modalType === "exit") {
      setIsOpenExitModal(true);
    } else if (modalType === "joinTable") {
      setIsOpenJoinTableModal(true);
    }
  };

  const onCloseModal = (modalType) => {
    if (modalType === "tableInfo") {
      setIsOpenTableInfoModal(false);
    } else if (modalType === "time") {
      setIsOpenTimeModal(false);
    } else if (modalType === "heart") {
      setIsOpenHeartModal(false);
    } else if (modalType === "exit") {
      setIsOpenExitModal(false);
    } else if (modalType === "joinTable") {
      setIsOpenJoinTableModal(false);
    }
  };

  // TODO: 박스가 선택됐을 경우 실행하는 것 관련 연결
  /*
    const handleBoxClick = (box) => {
    setSelectedBox(box.number);
    const selectedBoxText = `${box.number}번 테이블`;
    setBoxText(selectedBoxText);
    setSelectedBoxGender(box.person);
    setSelectedBoxTime(box.time);
    setIsOpenTableInfoModal(true);
  };
  

  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const toggleModal = () => {
    setIsOpenTableInfoModal(!isOpenTableInfoModal);
  };

  const handleButtonClick = (event, boxNumber) => {
    event.stopPropagation();

    if (selectedBoxes.includes(boxNumber)) {
      setSelectedBoxes(selectedBoxes.filter((number) => number !== boxNumber));
    } else {
      setSelectedBoxes([...selectedBoxes, boxNumber]);
    }
  };
  */

  // TODO: 버튼 선택시 실행되는 부분 (주석으로 처리했습니다), 회색으로 전환할 경우에 사용할지 몰라 코드를 남겨두겠습니다

  // const handleAllClick = () => {
  //   setIsButtonSelected((prevIsButtonSelected) => !prevIsButtonSelected);
  // };

  // useEffect(() => {
  //   if (isButtonSelected) {
  //     const allBoxNumbers = Array.from({ length: 30 }, (_, index) => index + 1);
  //     setSelectedBoxes(allBoxNumbers);
  //   } else {
  //     const allBoxNumbers = Array.from({ length: 30 }, (_, index) => index + 1);
  //     setSelectedBoxes([]);
  //   }
  // }, [isButtonSelected]);

  /*  TODO: 알람데이터 연결 + 알람 타입 넣어주기 */
  let [alarmData, setAlarmData] = useState([
    {
      alarm: "1번, 2번 테이블의 합석처리를 진행해주세요.",
      time: "19:20",
    },
    {
      alarm: "4번 테이블의 하트 N개를 충전해주세요.",
      time: "19:20",
    },
    {
      alarm: "9번 테이블에서 직원을 호출했습니다.",
      time: "19:20",
    },
    {
      alarm: "5번 테이블을 비워주세요.",
      time: "19:20",
    },
    {
      alarm: "4번, 16번 시간이 초과되었습니다.",
      time: "19:20",
    },
  ]);

  const onDelete = (index) => {
    // 삭제 로직을 구현합니다.
    // 예를 들어, alarmData 배열에서 index에 해당하는 항목을 제거할 수 있습니다.
    const updatedAlarmData = [...alarmData];
    updatedAlarmData.splice(index, 1);
    // 업데이트된 alarmData를 사용하도록 설정합니다.
    setAlarmData(updatedAlarmData);
  };

  // 현재 시간 출력
  const CurrentDateTime = () => {
    let [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);

    const formattedDateTime = currentDateTime.toLocaleString();

    return (
      <div>
        <p>{formattedDateTime}</p>
      </div>
    );
  };

  const [selectedOption, setSelectedOption] = useState("1");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="admin_body">
      <div class="v-line"></div>

      <header>
        <div class="admin_header">
          <div class="main-title">
            <img className="title-tiger" src={Tiger} alt="Tiger"></img>
            <img className="title-logo" src={Title} alt="Title"></img>
          </div>
          <div className="digital-clock">
            <CurrentDateTime />
          </div>
        </div>

        <div class="title-alarm">
          <p class="title-notice">
            <strong>NOTICE</strong>
          </p>
          <img class="title-bell" src={Call} alt="Call Image" />
        </div>
        <div className="alarmborderbox !important">
          <AlarmBorder />
        </div>
        {/* TODO: 알람 데이터 연결 */}
        <div className="alarm-container">
          {alarmData.map((item, index) => {
            return (
              <div key={index} className="alarm-item">
                <button className="alarmdel" onClick={() => onDelete(index)}>
                  <span className="alarmbtn">x</span>
                </button>
                <br />
                {/* 알람데이터 type에 따라 color 지정 */}
                <span
                  style={{
                    color:
                      alarmData.type === "join"
                        ? "#DD7DFF"
                        : alarmData.type === "heart"
                        ? "#FF8FD2"
                        : alarmData.type === "call"
                        ? "#FFC555"
                        : "#C8C8C8",
                  }}
                >
                  {alarmData.type === "join"
                    ? "[합석처리]"
                    : alarmData.type === "heart"
                    ? "[하트충전]"
                    : alarmData.type === "call"
                    ? "[직원 호출]"
                    : "[테이블 비우기]"}
                </span>
                <span className="alarm-message">{item.alarm}</span>
                <p>{item.time}</p>
              </div>
            );
          })}
        </div>
        <div class="bottom-line"></div>
      </header>
      <div class="table-list">
        <div class="table-man">{ tableNums.male }</div>
        <div class="table-woman">{ tableNums.female }</div>
        <div class="table-mixed">{ tableNums.mixed }</div>
        <div class="table-join">{ tableNums.joind }</div>
        <div class="table-empty">{ tableNums.empty }</div>
      </div>

      <div class="admin_nav">
        <div class="info_table1">
          <p class="info_title">남자 T</p>
        </div>

        <div class="info_table2">
          <p class="info_title">여자 T</p>
        </div>

        <div class="info_table3">
          <p class="info_title">혼성 T</p>
        </div>

        <div class="info_table4 q">
          <p class="info_title">합석 T</p>
        </div>

        <div class="info_table5">
          <p class="info_title">&nbsp;빈 T</p>
        </div>
      </div>

      {/* TODO: add AdminTable container style */}
      <div class="table-container">
	{/* isMultipleSelectMode && <select multiple={true} value={} onChange={}> */}
          { React.Children.toArray(data) }
	{/* isMultipleSelectMode && </select> */}
      </div>
      {isOpenTableInfoModal && (
        <TableInfoModal open={isOpenTableInfoModal}
          onClose={() => onCloseModal("tableInfo")}></TableInfoModal>
      )}

      {/* TODO: 테이블의 시간추가, 하트추가 등 기능 연결 */}
      <div className="admin-footer">
        <div className="footer-button">
          <button className="time-plus" onClick={() => onClickButton("time")}>
            시간 추가
          </button>
          {isOpenTimeModal && (
            <TimeModal open={isOpenTimeModal} onClose={() => onCloseModal("time")}></TimeModal>
          )}
          <button className="heart-plus" onClick={() => onClickButton("heart")}>
            하트 충전
          </button>
          {isOpenHeartModal && (
            <HeartModal open={isOpenHeartModal} onClose={() => onCloseModal("heart")}></HeartModal>
          )}
          <button className="table-exit" onClick={() => onClickButton("exit")}>
            퇴장 처리
          </button>
          {isOpenExitModal && (
            <ExitTableModal open={isOpenExitModal} onClose={() => onCloseModal("exit")}></ExitTableModal>
          )}
          <button className="table-mix" onClick={() => onClickButton("joinTable")}>
            합석 처리
          </button>
          {isOpenJoinTableModal && (
            <JoinTableModal open={isOpenJoinTableModal} onClose={() => onCloseModal("joinTable")}></JoinTableModal>
          )}
          {/* TODO: 테이블 선택을 눌렀을 때 적용할 코드 적용 */}
          {/* <button class="table_choice" onClick={handleAllClick}> */}
          <button class="table_choice">테이블 선택</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
