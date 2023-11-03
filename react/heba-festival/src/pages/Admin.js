import React, { useState, useEffect } from "react";
import "styles/Admin.css";
import Title from "assets/images/Title.svg";
import Tiger from "assets/images/Tiger.svg";
import Call from "assets/images/Call.svg";

import AdminBox from "components/Admin/AdminBox.js";
import AlarmBorder from "components/Admin/AlarmBorder.js";
import TableInfoModal from "components/Modal/AdminModal/TableInfoModal";
import TimeModal from "components/Modal/AdminModal/TimeModal";
import HeartModal from "components/Modal/AdminModal/HeartModal";
import ExitTableModal from "components/Modal/AdminModal/ExitTableModal";
import JoinTableModal from "components/Modal/AdminModal/JoinTableModal";

function Admin() {
  // TODO: useState 제거하고 let으로 변경하기
  const [isOpenTableInfoModal, setIsOpenTableInfoModal] = useState(false);
  const [isOpenTimeModal, setIsOpenTimeModal] = useState(false);
  const [isOpenHeartModal, setIsOpenHeartModal] = useState(false);
  const [isOpenExitModal, setIsOpenExitModal] = useState(false);
  const [isOpenJoinTableModal, setIsOpenJoinTableModal] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxText, setBoxText] = useState("");
  const [selectedBoxGender, setSelectedBoxGender] = useState(null);
  const [selectedBoxTime, setSelectedBoxTime] = useState(null);

  // TODO: 박스 value 관련 연결
  const boxData = Array.from({ length: 30 }, (_, index) => {
    const number = index + 1;
    const value =
      index % 6 === 0
        ? "woman"
        : index % 6 === 1
        ? "man"
        : index % 6 === 2
        ? "mix"
        : index % 6 === 3
        ? "join"
        : "empty";

    // TODO: 각 박스 별 시간연결
    const person = value === "empty" ? "" : value === "mix" ? "3" : "2";
    let time = "";
    if (value === "mix") {
      time = "12:00";
    } else if (value === "man") {
      time = "21:30";
    } else if (value === "woman") {
      time = "22:45";
    } else if (value === "join") {
      time = "10:00";
    } else {
      time = "";
    }
    return { number, value, person, time };
  });

  //박스 생성
  const boxesPerRow = 6;
  const totalRows = Math.ceil(boxData.length / boxesPerRow);

  const arrangedBoxData = Array.from({ length: totalRows }, (_, rowIndex) => {
    const start = rowIndex * boxesPerRow;
    const end = start + boxesPerRow;
    const rowBoxes = boxData.slice(start, end);
    return rowBoxes;
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
        {/* TODO: 각 테이블에 해당하는 인원수 데이터 연결 */}
        <div class="tableman">8</div>
        <div class="tablewom">8</div>
        <div class="tablecou">2</div>
        <div class="tablemix">7</div>
        <div class="tableemp">5</div>
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

      <div class="box-lists">
        <div className="box-container">
          {Array.from({ length: boxesPerRow }, (_, columnIndex) => (
            <div className="table-column" key={columnIndex}>
              {Array.from({ length: totalRows }, (_, rowIndex) => {
                const boxIndex = rowIndex * boxesPerRow + columnIndex;
                const box = boxData[boxIndex];
                if (box) {
                  return (
                    <AdminBox
                      key={box.number}
                      number={box.number}
                      value={box.value}
                      person={box.person}
                      time={box.time}
                      isSelected={selectedBox === box.number}
                      onBoxClick={() => handleBoxClick(box)}
                      onButtonClick={handleButtonClick}
                    />
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>
      {isOpenTableInfoModal && (
        <TableInfoModal
          open={isOpenTableInfoModal}
          onClose={() => onCloseModal("tableInfo")}
          boxNumber={selectedBox}
          boxGender={selectedBoxGender}
          boxTime={selectedBoxTime}
        ></TableInfoModal>
      )}

      {/* TODO: 테이블의 시간추가, 하트추가 등 기능 연결 */}

      <div className="admin-footer">
        <div className="footer-button">
          <button className="time-plus" onClick={() => onClickButton("time")}>
            시간 추가
          </button>
          {isOpenTimeModal && (
            <TimeModal
              selectedBoxes={selectedBoxes}
              open={isOpenTimeModal}
              onClose={() => onCloseModal("time")}
            ></TimeModal>
          )}
          <button className="heart-plus" onClick={() => onClickButton("heart")}>
            하트 충전
          </button>
          {isOpenHeartModal && (
            <HeartModal
              selectedBoxes={selectedBoxes}
              open={isOpenHeartModal}
              onClose={() => onCloseModal("heart")}
            ></HeartModal>
          )}
          <button className="table-exit" onClick={() => onClickButton("exit")}>
            퇴장 처리
          </button>
          {isOpenExitModal && (
            <ExitTableModal
              selectedBoxes={selectedBoxes}
              open={isOpenExitModal}
              onClose={() => onCloseModal("exit")}
            ></ExitTableModal>
          )}
          <button
            className="table-mix"
            onClick={() => onClickButton("joinTable")}
          >
            합석 처리
          </button>
          {isOpenJoinTableModal && (
            <JoinTableModal
              selectedBoxes={selectedBoxes}
              open={isOpenJoinTableModal}
              onClose={() => onCloseModal("joinTable")}
            ></JoinTableModal>
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
