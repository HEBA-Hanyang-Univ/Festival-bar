import React, { useEffect, useRef, useState } from "react";
import "styles/Modal.scss";
import useOutSideClick from "../useOutSideClick";
import ModalContainer from "../ModalContainer";


function ExitTableModal({ onClose, selectedBoxes, zIndex }) {
  const modalRef = useRef(null);

  // selectedBoxes가 배열이 아닌 경우, 배열로 변환
  let selectedBoxesArray = Array.isArray(selectedBoxes) ? selectedBoxes : [selectedBoxes];

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
    <ModalContainer style={{ zIndex: zIndex }}>
      <div className="overlay">
        <div className="adminModalWrap" ref={modalRef}>
          <div className="adminModalTitle">
            <span>{selectedBoxesArray.join(", ")}번 테이블</span>
          </div>
          <div className="adminModalContent">
            <span>퇴장 처리 하겠습니까?</span>
          </div>
          <div className="adminModalBtn">
            <button onClick={handleClose}>
              <span>퇴장 처리</span>
            </button>
          </div>
        </div>
      </div> 
    </ModalContainer>
  )
}

export default ExitTableModal;
