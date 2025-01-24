import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import "styles/Modal.scss";
import React, { useRef, useEffect } from "react";

function MessageModal({onClose, message}) {
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
	  {
            message.split('\n').map(line=>{
              return (<span style={{fontWeight: '700', lineHeight: '200%',}}>{line}<br/></span>)
	    })
	  }
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default MessageModal;
