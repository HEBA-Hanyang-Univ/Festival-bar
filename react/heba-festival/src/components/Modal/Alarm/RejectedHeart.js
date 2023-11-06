import React from "react";
import "styles/AlarmModal.scss";
import RejectedHeart from "assets/images/BrokenHeart.svg";
import CloseBtn from "assets/images/alarmClose.svg";

const RejectedHeartAlarm = ({onClose, tableNumber, time}) => {
  return (
    <div className="leftTimeAlarmBox" style={{borderColor: '#dcdcdc'}}>
      <div className="leftTimeImg">
        <img src={RejectedHeart} alt="alarm img"></img>
      </div>
      <div className="lefTimeMessage">
        <span className="alarmSpanMiddle">
          
	  { tableNumber }번 테이블에서 하트를 거절했습니다.
        </span>
        <span className="alarmSpanSmall">
	  { time }
        </span>
      </div>
      <div className="alarmCloseBtn" onClick={onClose}>
        <img src={CloseBtn} alt="close img"></img>
      </div>
    </div>
  );
}

export default RejectedHeartAlarm;
