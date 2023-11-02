import React, { useEffect, useRef, useState } from "react";
import "styles/Modal.scss";
import useOutSideClick from "../useOutSideClick";
import ModalContainer from "../ModalContainer";

function JoinTableModal({ onClose, selectedBoxes, zIndex }) {
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
            <span className="selectnum">{selectedBoxesArray.join(", ")}번 테이블</span>
          </div>
          <div className="adminModalContent">
            <span className="joinSpan">몇 번 테이블로 합석처리<br></br>하시겠습니까?<br></br></span>
            <input className="joinTableNum" type="text" pattern="\d*" maxL090ength="2"></input>
          </div>
          <div className="adminModalBtn">
            {/* TODO: 해당 테이블 번호와 input의 테이블 번호에 해당하는 인원 합석 */}
            <button onClick={handleClose}>
              <span>합석 처리</span>
            </button>
          </div>
        </div>
      </div> 
    </ModalContainer>
  )
}

export default JoinTableModal;
