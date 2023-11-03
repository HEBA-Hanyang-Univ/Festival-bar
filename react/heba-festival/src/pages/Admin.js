import React, { useState, useEffect } from "react";
import "styles/Admin.css";
import CurrentDateTime from "components/CurrentDateTime";
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";
import Couple from "assets/images/Couple.svg";
import Title from "assets/images/Title.svg";
import Tiger from "assets/images/Tiger.svg";
import Call from "assets/images/Call.svg";
import TimeOut from "assets/images/Timeout.svg";
import Door from "assets/images/Door.svg";

import TableInfoModal from "components/Modal/AdminModal/TableInfoModal";
import TimeModal from "components/Modal/AdminModal/TimeModal";
import HeartModal from "components/Modal/AdminModal/HeartModal";
import ExitTableModal from "components/Modal/AdminModal/ExitTableModal";
import JoinTableModal from "components/Modal/AdminModal/JoinTableModal";

export let Box = ({
  number,
  value,
  isSelected,
  person,
  time,
  onBoxClick,
  onButtonClick,
  exitRequested,
}) => {
  const initialBoxOptions = {
    man: { color: "#80C2FF", image: Man, alt: "Man" },
    woman: { color: "#FF8FD2", image: Woman, alt: "Woman" },
    mix: { color: "#FFC555", image: Couple, alt: "Couple" },
    join: { color: "#DD7DFF", image: Couple, alt: "Couple" },
    empty: { color: "#C8C8C8", image: null, alt: "" },
  };

  let [boxOptions, setBoxOptions] = useState(initialBoxOptions);
  let [selectedBox, setSelectedBox] = useState(null);
  let [selectedBoxes, setSelectedBoxes] = useState([]);

  const { color, image } = boxOptions[value] || boxOptions.empty;

  const boxStyle = {
    backgroundColor: color,
    position: "relative",
  };

  const imgStyle = {
    position: "absolute",
    marginTop: "20px",
    marginLeft: "-40px",
    width: "60px",
    height: "60px",
  };

  const personnumberStyle = {
    position: "absolute",
    marginTop: "28px",
    marginLeft: "30px",
    fontSize: "4rem",
    fontWeight: "800",
  };
  const buttonStyle = {
    backgroundColor: isSelected ? "black" : color,
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    left: "120px",
  };
  const timeStyle = {
    position: "absolute",
    marginTop: "75px",
    marginLeft: "-32px",
    fontSize: "2.5rem",
    fontWeight: "800",
  };

  const handleButtonClick = (event, boxNumber) => {
    event.stopPropagation();
    onButtonClick(event, number);
  };

  return (
    <div
      className="box"
      style={{
        ...boxStyle,
        ...(time === "00:00" || exitRequested
          ? { backgroundColor: "#fff" }
          : {}),
      }}
      onClick={() => onBoxClick(number)}
    >
      <span className="box-number">{number}번</span>
      {image && <img src={image} style={imgStyle} />}
      <button style={buttonStyle} onClick={handleButtonClick}></button>
      {person !== 0 && person !== "0" && (
        <span style={personnumberStyle}>{person} </span>
      )}
      <span style={timeStyle}>{time} </span>
      {time === "00:00" && !exitRequested && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              zIndex: "1",
            }}
          />
          <img
            src={TimeOut}
            style={{ ...imgStyle, zIndex: "2" }}
            alt="Time Out"
          />
        </div>
      )}
      {exitRequested && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              zIndex: "1",
            }}
          />
          <img src={Door} style={{ ...imgStyle, zIndex: "2" }} alt="Door" />
        </div>
      )}
    </div>
  );
};

function Admin() {
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
          time = "00:00";
        } else if (value === "man") {
          time = "21:30";
        } else if (value === "woman") {
          time = "22:45";
        } else {
          time = "";
        }
        return { number, value, person, time };
      });
    
  const boxesPerRow = 6;
  const totalRows = Math.ceil(boxData.length / boxesPerRow);

  const arrangedBoxData = Array.from({ length: totalRows }, (_, rowIndex) => {
    const start = rowIndex * boxesPerRow;
    const end = start + boxesPerRow;
    const rowBoxes = boxData.slice(start, end);
    return rowBoxes;
  });

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
  }

  const onCloseModal = (modalType) => {
    if(modalType === "tableInfo") {
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
  }

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

  const handleAllClick = () => {
    setIsButtonSelected((prevIsButtonSelected) => !prevIsButtonSelected);
  };

  useEffect(() => {
    if (isButtonSelected) {
      const allBoxNumbers = Array.from({ length: 30 }, (_, index) => index + 1);
      setSelectedBoxes(allBoxNumbers);
    } else {
      const allBoxNumbers = Array.from({ length: 30 }, (_, index) => index + 1);
      setSelectedBoxes([]);
    }
  }, [isButtonSelected]);

  /*  TODO: 알람데이터 연결 */
  let [alarmData, setAlarmData] = useState([
    {
      alarm: "[합석처리] 1번, 2번 테이블의 합석처리를 진행해주세요.",
      time: "19:20",
    },
    {
      alarm: "[하트충전] 4번 테이블의 하트 N개를 충전해주세요.",
      time: "19:20",
    },
    {
      alarm: "[직원 호출] 9번 테이블에서 직원을 호출했습니다.",
      time: "19:20",
    },
    {
      alarm: "[테이블 비우기] 5번 테이블을 비워주세요.",
      time: "19:20",
    },
    {
      alarm: "[테이블 비우기] 4번, 16번 시간이 초과되었습니다.",
      time: "19:20",
    },
  ]);

  const getColor = (alarmDataItem) => {
    const alarmPattern = /\[(.*?)\]/;
    const match = alarmDataItem.alarm.match(alarmPattern);

    if (match && match.length >= 2) {
      const extractedAlarmType = match[1];

      if (extractedAlarmType.includes("합석처리")) {
        return "#DD7DFF";
      } else if (extractedAlarmType.includes("하트충전")) {
        return "#FF8FD2";
      } else if (extractedAlarmType.includes("직원 호출")) {
        return "#FFC555";
      } else if (extractedAlarmType.includes("테이블 비우기")) {
        return "#C8C8C8";
      }
    }

    // 알람 타입이 일치하지 않는 경우 기본 색상 반환
    return "#000";
  };
  const onDelete = (index) => {
    // 삭제 로직을 구현합니다.
    // 예를 들어, alarmData 배열에서 index에 해당하는 항목을 제거할 수 있습니다.
    const updatedAlarmData = [...alarmData];
    updatedAlarmData.splice(index, 1);
    // 업데이트된 alarmData를 사용하도록 설정합니다.
    setAlarmData(updatedAlarmData);
  };

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
      <div class="h-line1"></div>
      <div class="h-line2"></div>
      <div class="h-line3"></div>
      <div class="h-line4"></div>
      <div class="h-line5"></div>
      <div class="h-line6"></div>
      <header>
        <div class="admin_header">
          <div class="main-title">
            <img className="title-tiger" src={Tiger} alt="Tiger"></img>
            <img src={Title} alt="Title"></img>
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
        {/* TODO: 알람 데이터 연결 */}
        <div className="alarm-container">
          {alarmData.map((item, index) => {
            const color = getColor(item);
            return (
              <div key={index} className="alarm-item" style={{ color: color }}>
                <button className="alarmdel" onClick={() => onDelete(index)}>
                  x
                </button>
                <br />
                <p>{item.alarm}</p>
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
          <p class="info_title">합성 T</p>
        </div>

        <div class="info_table5">
          <p class="info_title">&nbsp;빈 T</p>
        </div>
      </div>

      <div class="box-lists">
        <div class="table-container">
          {Array.from({ length: boxesPerRow }, (_, columnIndex) => (
              <div className="table-column" key={columnIndex}>
                {Array.from({ length: totalRows }, (_, rowIndex) => {
                  const boxIndex = rowIndex * boxesPerRow + columnIndex;
                  const box = boxData[boxIndex];
                  if (box) {
                    return (
                      <Box
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
      {isOpenTableInfoModal && <TableInfoModal open={isOpenTableInfoModal} onClose={() => onCloseModal("tableInfo")} boxNumber={selectedBox} boxGender={selectedBoxGender} boxTime={selectedBoxTime}></TableInfoModal>}
      <div className="admin-footer">
        <div className="footer-button">
          <button
            className="time-plus"
            onClick={() => onClickButton("time")}>
            시간 추가
          </button>
          {isOpenTimeModal && (
            <TimeModal selectedBoxes={selectedBoxes} open={isOpenTimeModal} onClose={() => onCloseModal("time")}></TimeModal>
          )}
          <button
            className="heart-plus"
            onClick={() => onClickButton("heart")}
          >
            하트 충전
          </button>
          {isOpenHeartModal && (
            <HeartModal selectedBoxes={selectedBoxes} open={isOpenHeartModal} onClose={() => onCloseModal("heart")}></HeartModal>
          )}
          <button
            className="table-exit"
            onClick={() => onClickButton("exit")}
          >
            퇴장 처리
          </button>
          {isOpenExitModal && (
            <ExitTableModal selectedBoxes={selectedBoxes} open={isOpenExitModal} onClose={() => onCloseModal("exit")}></ExitTableModal>
          )}
          <button
            className="table-mix"
            onClick={() => onClickButton("joinTable")}
          >
            합석 처리
          </button>
          {isOpenJoinTableModal && (
            <JoinTableModal selectedBoxes={selectedBoxes} open={isOpenJoinTableModal} onClose={() => onCloseModal("joinTable")}></JoinTableModal>
          )}
          <button class="table_choice" onClick={handleAllClick}>
            테이블 선택
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
