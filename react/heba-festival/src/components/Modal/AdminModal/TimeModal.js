import React, { useEffect, useRef, useState } from "react";
import "styles/Modal.scss";
import useOutSideClick from "../useOutSideClick";
import ModalContainer from "../ModalContainer";

function TimeModal({ onClose, targetTables, zIndex }) {
  const modalRef = useRef(null);
  const [time, setTime] = useState(0);

  // selectedBoxes가 배열이 아닌 경우, 배열로 변환
  let targetTableArray = Array.isArray(targetTables)
    ? targetTables
    : [targetTables];

  const handleClose = () => {
    onClose?.();
  };

  const handleTimeIncrement = () => {
    setTime((prevTime) => prevTime + 10);
  };

  const handleTimeDecrement = () => {
    if (time > 0) {
      setTime((prevTime) => prevTime - 10);
    }
  };

  useOutSideClick(modalRef, handleClose);
  useEffect(() => {
    const $body = document.querySelector("body");
    const overflow = $body.style.overflow;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  return (
    <ModalContainer style={{ zIndex: zIndex }}>
      <div className="overlay">
        <div className="adminModalWrap" ref={modalRef}>
          <div className="adminModalTitle">
            <span className="selectnum">
              {targetTableArray.join(", ")}번 테이블
            </span>
          </div>
          <div className="adminModalContent timeSet">
            <button onClick={handleTimeDecrement}>-</button>
            <input type="number" value={time} readOnly />
            <span className="subtext">분</span>
            <button onClick={handleTimeIncrement}>+</button>
          </div>
          <div className="adminModalBtn">
            <button onClick={handleClose}>
              <span>시간 추가</span>
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default TimeModal;
