import React from "react";
import "styles/AlarmModal.scss";
import LeftTimeImg from "assets/images/TimeOver.svg";
import CloseBtn from "assets/images/alarmClose.svg";

const LeftTimeAlarm = ({onClose}) => {
  return (
    <div className="leftTimeAlarmBox">
      <div className="leftTimeImg">
        <img src={LeftTimeImg} alt="alarm img"></img>
      </div>
      <div className="lefTimeMessage">
        <span className="alarmSpanMiddle">
          퇴장 시간 10분 남았습니다.
        </span>
        {/* TODO: 알림 온 시각 */}
        <span className="alarmSpanSmall">
          20:50
        </span>
      </div>
      <div className="alarmCloseBtn" onClick={onClose}>
        <img src={CloseBtn} alt="close img"></img>
      </div>
    </div>
  );
}

export default LeftTimeAlarm;