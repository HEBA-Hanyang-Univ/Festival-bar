import React from "react";
import "styles/AlarmModal.scss";
import MatchedImg from "assets/images/MatchedPink.svg";
import CloseBtn from "assets/images/alarmClose.svg";

const MatchedAlarm = ({onClose}) => {
  return (
    <div className="leftTimeAlarmBox" style={{borderColor: 
    '#dcdcdc'}}>
      <div className="leftTimeImg">
        <img src={MatchedImg} alt="alarm img"></img>
      </div>
      <div className="lefTimeMessage">
        <span className="alarmSpanMiddle">
          {/* TODO: 매칭된 테이블 번호 */}
          N번 테이블과 성공적으로 매칭 되었습니다!
        </span>
        {/* TODO: 알림 온 시각 */}
        <span className="alarmSpanSmall">
          20:50
        </span>
      </div>
      <div className="alarmCloseBtn" style={{marginLeft: '3rem'}} onClick={onClose}>
        <img src={CloseBtn} alt="close img"></img>
      </div>
    </div>
  );
}

export default MatchedAlarm;