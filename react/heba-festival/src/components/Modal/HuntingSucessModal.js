import React, {useEffect, useRef} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import CloseBtn from "assets/images/close.svg";
import { Link } from "react-router-dom";

function HeartChargeModal({ onClose }) {
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
        <div className="closeBtnBox">
              <button className="closeBtn" onClick={handleClose}>
                <img src={CloseBtn} alt="x img"></img>
              </button>
            </div>
          <div className="modalTitle">
            <span>Congratulations!</span>
          </div>
          <div className="modalContent huntingModal">
            <span style={{fontSize: '1.2rem', fontWeight: '600'}}>
              매칭에 성공하였습니다.
              <br></br><br></br>
              잠시만 기다려주시면
              <br></br>
              종업원이 합석을 도와드리겠습니다.
            </span>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default HeartChargeModal;