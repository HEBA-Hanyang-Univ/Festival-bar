import React from "react";
import "styles/AlarmModal.scss";
import HeartMessage from "assets/images/ReceivedHeart.svg";
import CloseBtn from "assets/images/alarmClose.svg";

const ReceivedHeartAlarm = ({onClose, tableNumber, time, onAccept, onReject}) => {
  return (
    <div className="leftTimeAlarmBox receivedHeartBox">
      <div className="alarmTop">
        <div className="leftTimeImg">
          <img src={HeartMessage} alt="alarm img"></img>
        </div>
        <div className="lefTimeMessage">
          <span className="alarmSpanMiddle">
          { tableNumber  }번 테이블에서 하트를 보냈습니다.
          </span>
          <span className="alarmSpanSmall">
	  { time }
          </span>
        </div>
        <div className="alarmCloseBtn" onClick={onClose}>
          <img src={CloseBtn} alt="close img"></img>
        </div>
      </div>
      <div className="alarmBtnBox">
        {/* TODO: 만약 합석이 수락된다면 합석대기 모달, 아니라면 거절 처리 */}
        <button className="blueBtn" onClick={onAccept}>합석</button>
        <button className="pinkBtn" onClick={onReject}>거절</button>
      </div>
      <div className="alertSpan">
        <span>합석 버튼을 클릭하면 다른 테이블의 메세지는 클릭할 수 없습니다.</span>
      </div>
    </div>
  );
}

export default ReceivedHeartAlarm;
