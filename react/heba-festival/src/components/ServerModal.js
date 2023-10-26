import React, {useEffect, useRef} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";

function ServerModal({ onClose }) {
  const handleClose = () => {
    onClose ?.();
  };
  return (
    <ModalContainer>
      <div className="overlay">
        <div className="modalWrap">
          <div className="modalTitle"></div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ServerModal;