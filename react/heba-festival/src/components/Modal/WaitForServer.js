import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import "styles/Modal.scss";
import CloseBtn from "assets/images/close.svg";
import React, { useRef, useEffect } from "react";

function WaitForServer({onClose}) {
  const modalRef = useRef(null)
  const handleClose = () => {
    onClose ?.()
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
          <div className="modalContent" style={{paddingTop: '3rem', paddingLeft:'1.8rem'}}>
            <span style={{fontWeight:'700', lineHeight: '200%'}}>
              직원을 호출하였습니다.
              <br></br>
              잠시만기다려주세요.
            </span>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default WaitForServer;