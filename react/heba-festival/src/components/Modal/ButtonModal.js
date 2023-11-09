import React, {useEffect, useRef, useState} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import secureLocalStorage from "react-secure-storage";

function ButtonModal({ onClose, onClickButton, message, buttonMessage }) {
  const modalRef = useRef(null)
  const [isOpenWaitForServer, setIsOpenWaitForServer] = useState(false);
  const [isOpenFailedModal, setIsOpenFailedModal] = useState(false);
  const handleClose = () => {
    onClose ?.()
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onClickButton?.();
    handleClose();
  }

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
          <div className="modalContent">
            {
              message.split('\n').map(line => {
	        return (<span style={{fontWeight:'800'}}>{line}<br/></span>)
	      })
	    }
            <button type="submit" onClick={handleSubmit}>
              <span>{buttonMessage}</span>
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ButtonModal;
