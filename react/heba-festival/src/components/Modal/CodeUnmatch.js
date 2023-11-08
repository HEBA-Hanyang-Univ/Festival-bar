import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import "styles/Modal.scss";
import React, { useRef, useEffect } from "react";

function CodeUnmatch({onClose}) {
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
        <div className="modalWrap" ref={modalRef} style={{width: '70%'}}>
          <div className="modalContent" style={{paddingTop: '3rem', paddingLeft:'1.8rem'}}>
            <span style={{fontWeight:'700', lineHeight: '200%'}}>
              코드가 일치하지 않습니다.
              <br></br>
              다시 입력해주세요.
            </span>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default CodeUnmatch;