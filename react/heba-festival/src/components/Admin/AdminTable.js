import React, { useState, useEffect } from "react";
import "styles/AdminBox.css";
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";
import Couple from "assets/images/Couple.svg";
import Matched from "assets/images/Matched.svg";
import ManagerCall from "assets/images/Managercall.svg";
import TimeOut from "assets/images/Timeout.svg";
import Door from "assets/images/Door.svg";

const AdminTableRenderOptions = {
  man: { bgColor: "#80C2FF", textColor: "white", image: Man, alt: "Man" },
  woman: { bgColor: "#FF8FD2", textColor: "white", image: Woman, alt: "Woman" },
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
    onClickTable?.();
  };

  const tableStyle = {
    backgroundColor: renderOption.bgColor,
    border: hasNotice ? "2px solid red" : "none",
    color: renderOption.textColor,
    width: "8.25rem",
    height: "5.625rem",
  };

  const imgStyle = {
    position: "absolute",
    marginTop: "2.19rem",
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

  const timeStyle = {
    position: "absolute",
    marginTop: "80px",
    marginLeft: "-32px",
    fontSize: "2.5rem",
    fontWeight: "800",
    color: (remainedTime <= 600) ? "red" : "black",
  };

  const managerCallImgStyle = {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "10px",
    left: "120px",
  };

  return (
    <div className="tableWrap">
      <button className="adminTable" style={ tableStyle } onClick={ onClickButton }>
        <span className="box-number">{ tableNumber }번</span>
	{ friendCode !== "" && <span>{ friendCode }</span> }
        { hasNotice && <img src={ ManagerCall } style={ managerCallImgStyle } alt="Manager Call"/> }
        { renderOption.image && <img src={renderOption.image} style={imgStyle} alt={renderOption.alt}/>}
        { headCount > 0 && <span style={personnumberStyle}>{headCount}</span> }
        { remainedTime > 0 && <span style={timeStyle}>{String(Math.floor(remainedTime/60)).padStart(2,'0')}:{String(Math.floor(remainedTime%60)).padStart(2,'0')}</span> }
      </button>
    </div>
  );
};
export default AdminTable;
