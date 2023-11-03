import React, {useEffect, useRef, useState} from "react";
import "styles/AlarmModal.scss";
import useOutSideClick from "../useOutSideClick";
import ModalContainer from "../ModalContainer";

import LeftTimeAlarm from "./LeftTimeAlarm";
import ExitTimeAlarm from "./ExitTimeAlarm";
import RejectedHeartAlarm from "./RejectHeartAlarm";
import MatchedAlarm from "./MatchedAlarm";
import ReceivedHeartAlarm from "./ReceivedHeartAlarm";

const AlarmModal = ({onClose}) => {
  const modalRef = useRef(null);
  const [alarms, setAlarms] = useState(['leftTime', 'exitTime', 'heartRejected', 'matched', 'heartReceived']); 
  const handleClose = () => {
    onClose ?.()
  };

  const removeAlarm = (index) => {
    setAlarms(alarms.filter((_, i) => i !== index));
  };

  useOutSideClick(modalRef, handleClose);
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow
    };
  }, []);

  const getAlarmComponent = (alarm) => {
    switch (alarm) {
      case 'leftTime':
        return LeftTimeAlarm;
      case 'exitTime':
        return ExitTimeAlarm;
      case 'heartRejected':
        return RejectedHeartAlarm;
      case 'matched':
        return MatchedAlarm;
      case 'heartReceived':
        return ReceivedHeartAlarm;
      default: 
        return null;
    }
  };

  return (
    <ModalContainer>
      <div className="alarmOverlay">
        <div className="alarmModalWrap" ref={modalRef}>
          <div className="alarmContainer">
            {alarms.map((alarm, index) => {
              const Component = getAlarmComponent(alarm);
              return (
                <div key={index} style={{marginBottom: '1rem'}}>
                  <Component onClose={() => removeAlarm(index)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AlarmModal;
