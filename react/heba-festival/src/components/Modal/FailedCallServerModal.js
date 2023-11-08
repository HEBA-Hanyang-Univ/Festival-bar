import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import "styles/Modal.scss";
import React, { useRef, useEffect } from "react";

function FailedCallServerModal({onClose}) {
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
          <div className="modalContent" style={{paddingTop: '2.6rem'}}>
            <span style={{fontWeight: '700', lineHeight: '200%'}}>
              호출에 실패했습니다.
              <br></br>
              관리자에게 문의해주세요.
            </span>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default FailedCallServerModal;