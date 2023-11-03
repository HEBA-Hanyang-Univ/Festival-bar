import React from "react";
import "styles/AlarmModal.scss";
import RejectedHeart from "assets/images/BrokenHeart.svg";
import CloseBtn from "assets/images/alarmClose.svg";

const RejectedHeartAlarm = ({onClose}) => {
  return (
    <div className="leftTimeAlarmBox" style={{borderColor: '#dcdcdc'}}>
      <div className="leftTimeImg">
        <img src={RejectedHeart} alt="alarm img"></img>
      </div>
      <div className="lefTimeMessage">
        <span className="alarmSpanMiddle">
          {/* TODO: 하트를 거절한 측의 테이블 번호 */}
          N번 테이블에서 하트를 거절했습니다.
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

export default RejectedHeartAlarm;