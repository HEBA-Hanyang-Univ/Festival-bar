import React, { useState, useEffect } from "react";
import "styles/Admin.css";
import CurrentDateTime from "components/CurrentDateTime";
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";
import Couple from "assets/images/Couple.svg";
import Title from "assets/images/Title.svg";
import Tiger from "assets/images/Tiger.svg";
import Call from "assets/images/Call.svg";

export let Box = ({
  number,
  value,
  isSelected,
  person,
  onBoxClick,
  onButtonClick,
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
    marginTop: "32px",
    marginLeft: "30px",
    fontSize: "2.5rem",
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

  const handleButtonClick = (event, boxNumber) => {
    event.stopPropagation();
    onButtonClick(event, number);
  };

  return (
    <div className="box" style={boxStyle} onClick={() => onBoxClick(number)}>
      <span className="box-number">{number}번</span>
      {image && <img src={image} style={imgStyle} />}
      <button style={buttonStyle} onClick={handleButtonClick}></button>
      {person !== 0 && person !== "0" && (
        <span style={personnumberStyle}>{person} </span>
      )}
    </div>
  );
};

function Admin() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxtext, setBoxText] = useState("");

  const handleBoxClick = (boxNumber) => {
    setSelectedBox(boxNumber);
    const selectedBoxText = `${boxNumber}번 테이블`;
    setBoxText(selectedBoxText);
    openPopup("box");
  };

  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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

  const [isTimePlusVisible, setTimePlusVisible] = useState(false);
  const [isHeartPlusVisible, setHeartPlusVisible] = useState(false);
  const [isTableExitVisible, setTableExitVisible] = useState(false);
  const [isTableMixVisible, setTableMixVisible] = useState(false);

  let alarmData = [
    {
      alarm: "[시간 충전] 5번 테이블에 시간을 N분 충전해 주세요",
      time: "19:20",
    },
    {
      alarm: "[합석 처리] 1번, 2번 테이블의 합석 처리를 진행해 주세요.",
      time: "19:20",
    },
    {
      alarm: "[하트 충전] 4번 테이블에 하트 N개를 충전해 주세요.",
      time: "19:20",
    },
    {
      alarm: "[이용 시간] 3번 테이블의 이용 시간이 10분 남았습니다.",
      time: "19:20",
    },
    {
      alarm: "[테이블 비우기] 3번 테이블을 비워주세요.",
      time: "19:20",
    },
  ];
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

  const [value, setValue] = useState(0);

  const increaseValue = () => {
    setValue(value + 10);
  };

  const decreaseValue = () => {
    setValue(value - 10);
  };

  const upValue = () => {
    setValue(value + 1);
  };

  const downValue = () => {
    setValue(value - 1);
  };

  const handlePopupClick = (type) => {
    if (selectedBoxes.length > 0) {
      openPopup(type);
    }
  };

  const openPopup = (type) => {
    setPopupType(type);
    toggleModal();
  };

  const closePopup = () => {
    setPopupType(null);
    toggleModal();
    setSelectedBoxes([]);
    setValue(0);
  };

  const [selectedOption, setSelectedOption] = useState("1");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const exitPopup = () => {
    setPopupType(null);
    toggleModal();
  };

  const switchPopupClick = (type) => {
    exitPopup();
    setTimeout(() => {
      setPopupType(type);
    }, 0);
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
        {/*  알람 데이터 연결 */}
        <div className="alarm-container">
          {alarmData.map((item, index) => (
            <div key={index} className="alarm-item">
              <button class="alarmdel">x</button>
              <br />
              <p>{item.alarm}</p>
              <p>{item.time}</p>
            </div>
          ))}
        </div>
        <div class="bottom-line"></div>
      </header>
      <div class="table-list">
        {/* 각 테이블에 해당하는 인원수 데이터 연결 */}
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

        <div class="info_table4">
          <p class="info_title">합성 T</p>
        </div>

        <div class="info_table5">
          <p class="info_title">&nbsp;빈 T</p>
        </div>
      </div>

      <div class="box-lists">
        <div class="table-container">
          {/* 각 박스에 인원수 및 고객 정보 연결 */}
          <Box
            number={1}
            value="woman"
            person="2"
            isSelected={selectedBoxes.includes(1)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={2}
            value=""
            person=""
            isSelected={selectedBoxes.includes(2)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={3}
            value="woman"
            person="2"
            isSelected={selectedBoxes.includes(3)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={4}
            value="mix"
            person="3"
            isSelected={selectedBoxes.includes(4)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={5}
            value="join"
            person="2"
            isSelected={selectedBoxes.includes(5)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={6}
            value="man"
            person="2"
            isSelected={selectedBoxes.includes(6)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div class="table-container">
          <Box
            number={7}
            value="join"
            person="2"
            isSelected={selectedBoxes.includes(7)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={8}
            value="man"
            person="2"
            isSelected={selectedBoxes.includes(8)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={9}
            value="woman"
            person="2"
            isSelected={selectedBoxes.includes(9)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={10}
            value="join"
            person="2"
            isSelected={selectedBoxes.includes(10)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={11}
            value="woman"
            person="2"
            isSelected={selectedBoxes.includes(11)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={12}
            value="woman"
            person="2"
            isSelected={selectedBoxes.includes(12)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div class="table-container">
          <Box
            number={13}
            value="empty"
            person=""
            isSelected={selectedBoxes.includes(13)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={14}
            value="join"
            person="2"
            isSelected={selectedBoxes.includes(14)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={15}
            value=""
            person=""
            isSelected={selectedBoxes.includes(15)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={16}
            value="woman"
            person="2"
            isSelected={selectedBoxes.includes(16)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={17}
            value="man"
            person="2"
            isSelected={selectedBoxes.includes(17)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={18}
            value=""
            person=""
            isSelected={selectedBoxes.includes(18)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div class="table-container">
          <Box
            number={19}
            value="join"
            person="2"
            isSelected={selectedBoxes.includes(19)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={20}
            value="man"
            person="2"
            isSelected={selectedBoxes.includes(20)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={21}
            value="woman"
            person="2"
            isSelected={selectedBoxes.includes(21)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={22}
            value="man"
            person="2"
            isSelected={selectedBoxes.includes(22)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={23}
            value="join"
            person="4"
            isSelected={selectedBoxes.includes(23)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={24}
            value="man"
            person="2"
            isSelected={selectedBoxes.includes(24)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
        <div class="table-container">
          <Box
            number={25}
            value="woman"
            person="2"
            isSelected={selectedBoxes.includes(25)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={26}
            value="man"
            person="4"
            isSelected={selectedBoxes.includes(26)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={27}
            value=""
            person="0"
            isSelected={selectedBoxes.includes(27)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={28}
            value="mix"
            person="2"
            isSelected={selectedBoxes.includes(28)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={29}
            value="man"
            person="2"
            isSelected={selectedBoxes.includes(29)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
          <Box
            number={30}
            value="join"
            person="2"
            isSelected={selectedBoxes.includes(30)}
            onBoxClick={handleBoxClick}
            onButtonClick={handleButtonClick}
          />
        </div>
      </div>
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {popupType === "box" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-box">
                  <div className="boxtitle">
                    <div className="close-button" onClick={closePopup}>
                      x
                    </div>
                    <h2 className="boxname">{boxtext}</h2>
                  </div>

                  <div className="contentposi">
                    <div className="boxcontent">
                      <span className="boxvalue">인원수 : n</span>
                      {/* 인원수 연결 */}
                      <br />
                      {/*  입장,퇴장 시간연결 */}
                      <span className="boxvalue">입장시간 : 19:30</span>
                      <br />
                      <span className="boxvalue">퇴장시간 : 21:00</span>
                    </div>
                    <div className="boxbuttons">
                      <button
                        className="boxbtn"
                        onClick={() => switchPopupClick("time")}
                      >
                        시간추가
                      </button>
                      <button
                        className="boxbtn"
                        onClick={() => switchPopupClick("heart")}
                      >
                        하트추가
                      </button>
                      <button
                        className="boxbtn"
                        onClick={() => switchPopupClick("exit")}
                      >
                        퇴장처리
                      </button>
                      <button
                        className="boxbtn"
                        onClick={() => switchPopupClick("mix")}
                      >
                        합석처리
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {popupType === "time" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2 className="classname">
                    {selectedBoxes.join(", ")}번 테이블
                  </h2>

                  <div className="content-area">
                    <button className="adjust-button" onClick={decreaseValue}>
                      -
                    </button>
                    <span className="value">{value}분</span>
                    <button className="adjust-button" onClick={increaseValue}>
                      +
                    </button>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    시간추가
                  </button>
                </div>
              </div>
            )}
            {popupType === "heart" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2 className="classname">
                    {selectedBoxes.join(", ")}번 테이블
                  </h2>

                  <div className="content-area">
                    <button className="adjust-button" onClick={downValue}>
                      -
                    </button>
                    <span className="value">{value}개</span>
                    <button className="adjust-button" onClick={upValue}>
                      +
                    </button>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    하트추가
                  </button>
                </div>
              </div>
            )}
            {popupType === "exit" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2 className="classname">
                    {selectedBoxes.join(", ")}번 테이블
                  </h2>

                  <div className="content-area">
                    <span className="content">
                      <br />
                      퇴장처리하시겠습니까?
                    </span>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    퇴장처리
                  </button>
                </div>
              </div>
            )}
            {popupType === "mix" && (
              <div id="layer_bg" className="modal-container">
                <div id="popup" className="modal-content">
                  <div className="close-button" onClick={closePopup}>
                    x
                  </div>
                  <h2 className="classname">
                    {selectedBoxes.join(", ")}번 테이블
                  </h2>

                  <div className="content-area">
                    <span className="content">
                      <div>몇 번 테이블로 </div>
                      <div>합석처리하시겠습니까?</div>
                    </span>
                  </div>
                  <div>
                    <select
                      className="select"
                      value={selectedOption}
                      onChange={handleChange}
                    >
                      {[...Array(30)].map((_, index) => (
                        <option key={index + 1} value={String(index + 1)}>
                          {index + 1}번
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="plus-button" onClick={closePopup}>
                    합석처리
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="admin-footer">
        <div className="footer-button">
          <button
            className="time-plus"
            onClick={() => {
              handlePopupClick("time");
            }}
          >
            시간 추가
          </button>
          <button
            className="heart-plus"
            onClick={() => {
              handlePopupClick("heart");
            }}
          >
            하트 충전
          </button>
          <button
            className="table-exit"
            onClick={() => {
              handlePopupClick("exit");
            }}
          >
            퇴장 처리
          </button>
          <button
            className="table-mix"
            onClick={() => {
              handlePopupClick("mix");
            }}
          >
            합석 처리
          </button>
          <button class="table_choice" onClick={handleAllClick}>
            테이블 선택
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
