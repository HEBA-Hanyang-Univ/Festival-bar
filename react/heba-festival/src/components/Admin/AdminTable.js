import React, { useState, useEffect } from "react";
import "styles/AdminBox.css";
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";
import Couple from "assets/images/Couple.svg";
import Matched from "assets/images/Matched.svg";
import ManagerCall from "assets/images/Managercall.png";
import TimeOut from "assets/images/Timeout.svg";
import Door from "assets/images/Door.svg";

const AdminTableRenderOptions = {
  male: { bgColor: "#80C2FF", textColor: "white", image: Man, alt: "Man" },
  female: { bgColor: "#FF8FD2", textColor: "white", image: Woman, alt: "Woman" },
  mixed: { bgColor: "#FFC555", textColor: "white", image: Couple, alt: "Mixed" },
  joined: { bgColor: "#DD7DFF", textColor: "white", image: Matched, alt: "Matched" },
  empty: { bgColor: "#C8C8C8", textColor: "white", image: null, alt: "" },
  timeout: { bgColor: "white", textColor: "red", image: TimeOut, alt: "TimeOut" },
};


// TODO : do something with that styles... use "rem" instead of "px"
const AdminTable = ({ tableNumber, friendCode, gender, huntingSuccess, headCount, remainedTime, managerCall, onClickTable }) => {

  let renderOption = AdminTableRenderOptions.empty;
  if (huntingSuccess) {
    renderOption = AdminTableRenderOptions.joined;
  } else if (gender === "male" || gender === "female" || gender === "mixed") {
    renderOption = AdminTableRenderOptions[gender];
  }
  let hasNotice = managerCall;

  // if remained time is less than 0 sec, the table will be turned into timeout
  // and also, red border will be created
  if (remainedTime <= 0) {
    renderOption = AdminTableRenderOptions.timeout;
    hasNotice = true;
  }

  const onClickButton = (e) => {
    e.preventDefault();
    onClickTable?.(e);
  };

  const tableStyle = {
    backgroundColor: renderOption.bgColor,
    border: hasNotice ? "2px solid red" : "none",
    color: renderOption.textColor,
    borderRadius: "1.3rem",
  };

  const imgStyle = {
    width: "5rem",
    height: "auto",
    marginTop: '1.7rem',
    marginRight: '0.4rem',
  };

  const personnumberStyle = {
    marginTop: '0.6rem',
    marginLeft: "0.3rem",
    fontSize: "4rem",
    fontWeight: "800",
  };

  const timeStyle = {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: (remainedTime <= 600) ? "red" : "black",
  };

  const managerCallImgStyle = {
    width: "3rem",
    height: "3rem",
    marginLeft: "0.8rem",
    marginTop: "0.8rem",
  };

  let isTimeOut = false
  if (renderOption === AdminTableRenderOptions.timeout) {
    isTimeOut = true;
  }

  return (
    <div className="adminTableWrap">
      <button className="adminTable" style={ managerCall ? { ...tableStyle, border: "2px solid red" } : tableStyle } onClick={ onClickButton }>
        <div className="adminTableTop">
          <span className="table-number" style={{color:renderOption.textColor}}>{ tableNumber }번</span>
          { friendCode !== "" && <span className="friend-code">{ friendCode }</span> }
          { managerCall && <img src={ ManagerCall } style={ managerCallImgStyle } alt="Manager Call" /> }
        </div>
        <div className="adminTableMiddle">
          { renderOption.image && <img src={renderOption.image} style={imgStyle} alt={renderOption.alt}/>}
          { !isTimeOut && headCount > 0 &&
	      <span style={personnumberStyle}>{headCount}</span> }
        </div>
        <div className="adminTableBottom">
          { !isTimeOut && remainedTime > 0 && <span style={timeStyle}>{String(Math.floor(remainedTime/60)).padStart(2,'0')}:{String(Math.floor(remainedTime%60)).padStart(2,'0')}</span> }
        </div>
      </button>
    </div>
  );
};
export default AdminTable;
