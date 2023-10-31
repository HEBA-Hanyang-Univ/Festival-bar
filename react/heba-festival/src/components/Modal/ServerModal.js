import React, {useEffect, useRef} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";

function ServerModal({ onClose }) {
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
            <span>직원 호출</span>
          </div>
          <div className="modalContent serverContent">
            <span>직원을 호출하시겠습니까?</span>
            {/* TODO: 직원 호출 알람 */}
            <button onClick={handleClose}>
              <span>직원호출</span>
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ServerModal;