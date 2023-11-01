import React, {useEffect, useRef, useState} from "react";
import "styles/Modal.scss";
import useOutSideClick from "../useOutSideClick";
import ModalContainer from "../ModalContainer";

function JoinTableModal({ onClose, selectedBoxes }) {
  const modalRef = useRef(null);

  const handleClose = () => {
    onClose ?.();
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


  return (
    <ModalContainer>
      <div className="overlay">
        <div className="adminModalWrap" ref={modalRef}>
          <div className="adminModalTitle">
            <span>{selectedBoxes.join(", ")}번 테이블</span>
          </div>
          <div className="adminModalContent">
            <span className="joinSpan">몇 번 테이블로 합석처리<br></br>하시겠습니까?<br></br></span>
            <input className="joinTableNum" type="text" pattern="\d*" maxLength="2"></input>
          </div>
          <div className="adminModalBtn">
            <button>
              <span>합석 처리</span>
            </button>
          </div>
        </div>
      </div> 
    </ModalContainer>
  )
}

export default JoinTableModal;