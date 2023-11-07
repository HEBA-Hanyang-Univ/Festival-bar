import React, {useEffect, useRef, useState} from "react";
import secureLocalStorage from "react-secure-storage";

import "styles/AlarmModal.scss";
import useOutSideClick from "../useOutSideClick";
import ModalContainer from "../ModalContainer";
import LeftTimeAlarm from "./LeftTimeAlarm";
import ExitTimeAlarm from "./ExitTimeAlarm";
import MatchedAlarm from "./MatchedAlarm";
import ReceivedHeartAlarm from "./ReceivedHeart";
import RejectedHeartAlarm from "./RejectedHeart";

const AlarmModal = ({onClose, alarmData}) => {
  const modalRef = useRef(null);
  const [alarms, setAlarms] = useState(alarmData); 
  const handleClose = () => {
    onClose ?.()
  };

  // I don't wanna use secureLocalStorage here, but...
  let filter = secureLocalStorage.getItem('notice_filter');
  if (filter == null) {
    filter = [];
  }

  const removeAlarm = (index) => {
    filter = [...filter, index];
    setAlarms(alarms.filter((alarm) => !filter.includes(alarm.index)).sort((a,b) => a.index - b.index));
    secureLocalStorage.setItem("notice_filter", filter);
    secureLocalStorage.setItem('notice', alarms);
  };

  useOutSideClick(modalRef, handleClose);
  useEffect(() => {
    setAlarms(alarms.filter((alarm) => !filter.includes(alarm.index)).sort((a,b) => a.index - b.index));

    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow
    };
  }, []);

  const getAlarmComponent = (alarm) => {
    switch (alarm.type) {
      case 'timeAlert':
        return LeftTimeAlarm;
      case 'timeout':
        return ExitTimeAlarm;
      case 'rejected':
        return RejectedHeartAlarm;
      case 'matched':
        return MatchedAlarm;
      case 'received':
        return ReceivedHeartAlarm;
      default:
        console.log(alarm);
        return null;
    }
  };

  return (
    <ModalContainer>
      <div className="alarmOverlay">
        <div className="alarmModalWrap" ref={modalRef}>
          <div className="alarmContainer">
            { alarms && alarms.map((alarm) => {
              const Component = getAlarmComponent(alarm);
              return (
                <div style={{marginBottom: '1rem'}}>
                  <Component onClose={() => removeAlarm(alarm.index)}
		      time={alarm.time} tableNumber={alarm.from} />
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
