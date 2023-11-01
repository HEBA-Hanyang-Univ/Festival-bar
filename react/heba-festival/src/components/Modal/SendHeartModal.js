import React, {useEffect, useRef} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";

// 원하는 테이블에 하트 보내기
function SendHeartModal({ onClose, tableNumber }) {
  const modalRef = useRef(null)
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
        <div className="modalWrap" ref={modalRef}>
          <div className="modalTitle">
            <span>{tableNumber}번 테이블</span>
          </div>
          <div className="modalContent">
            <div className="SendHeartTop">
              <img></img>
            </div>
            {/* TODO: 해당 테이블에 하트 보내기 */}
            <button>
              <span>하트 보내기</span>
            </button>
            <button onClick={handleClose}>취소</button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default SendHeartModal;
