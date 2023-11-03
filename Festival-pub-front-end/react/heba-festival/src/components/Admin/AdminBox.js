import React, { useState, useEffect } from "react";

import "styles/AdminBox.css"; // styles 폴더 경로에 따라 수정이 필요할 수 있습니다.
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";
import Couple from "assets/images/Couple.svg";
import Matched from "assets/images/Matched.svg";
import ManagerCall from "assets/images/Managercall.svg";
import TimeOut from "assets/images/Timeout.svg";
import Door from "assets/images/Door.svg";

const AdminBox = ({
  number,
  value,
  person,
  time,
  onBoxClick,
  exitRequested,
  managerCall, // 직원 호출 요청을 나타내는 변수
}) => {
  const initialBoxOptions = {
    man: { color: "#80C2FF", image: Man, alt: "Man" },
    woman: { color: "#FF8FD2", image: Woman, alt: "Woman" },
    mix: { color: "#FFC555", image: Couple, alt: "Couple" },
    join: { color: "#DD7DFF", image: Matched, alt: "Matched" },
    empty: { color: "#C8C8C8", image: null, alt: "" },
  };
  const [isManagerCall, setIsManagerCall] = useState(managerCall);

  let [boxOptions, setBoxOptions] = useState(initialBoxOptions);
  let [selectedBox, setSelectedBox] = useState(null);
  let [selectedBoxes, setSelectedBoxes] = useState([]);

  const { color, image } = boxOptions[value] || boxOptions.empty;

  const boxStyle = {
    backgroundColor: color,
    position: "relative",
    border: isManagerCall ? "1px solid red" : "none", // 매니저 호출일 때만 border 추가
  };

  const boxNumberStyle = {
    // 시간에 따라 박스 시간 색상 변화
    color: time === "00:00" && !exitRequested ? "red" : "white", // 조건에 따라 빨간색 또는 검은색
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
    marginTop: "30px",
    marginLeft: "30px",
    fontSize: "4rem",
    fontWeight: "800",
  };

  // TODO: 10보다 시간이 작은 경우에 따라 빨간색으로 색상 변화 -> 이렇게 해도 될까요?
  const timeStyle = {
    position: "absolute",
    marginTop: "80px",
    marginLeft: "-32px",
    fontSize: "2.5rem",
    fontWeight: "800",
    color:
      time <= "10:00"
        ? "red"
        : time === "00:00" && !exitRequested
        ? "red"
        : "black",
  };

  // 이미지 클릭 시 isManagerCall 값을 토글하여 border와 이미지를 제거
  const handleImageClick = (event) => {
    event.stopPropagation();
    setIsManagerCall(!isManagerCall); // isManagerCall 값을 토글하여 border를 추가 또는 제거
  };

  const managerCallImgStyle = {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "10px",
    left: "120px",
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
      <span style={boxNumberStyle} className="box-number">
        {number}번
      </span>
      {image && <img src={image} style={imgStyle} />}
      {isManagerCall && (
        <img
          src={ManagerCall}
          style={{ ...imgStyle, ...managerCallImgStyle }}
          onClick={handleImageClick}
          alt="Manager Call"
        />
      )}
      {/* 직원 호출 요청이 들어왔을 때 Managercall 이미지를 표시 */}
      {person !== 0 && person !== "0" && (
        <span style={personnumberStyle}>{person} </span>
      )}
      <span style={timeStyle}>{time} </span>
      {time === "00:00" && !exitRequested && (
        <img
          src={TimeOut}
          style={{
            ...imgStyle,
            backgroundColor: "white",
            width: "12rem",
            height: "9rem",
            marginTop: "2.1rem",
            marginLeft: "-5rem",
            marginRadius: "10px",
          }}
          alt="Time Out"
        />
      )}
      {exitRequested && (
        <div style={{ position: "relative" }}>
          <img
            src={Door}
            style={{
              ...imgStyle,
              backgroundColor: "white",
              width: "12rem",
              height: "9rem",
              marginTop: "2.2rem",
              marginLeft: "-5rem",
              marginRadius: "10px",
            }}
            alt="Door"
          />
        </div>
      )}
    </div>
  );
};
export default AdminBox;
