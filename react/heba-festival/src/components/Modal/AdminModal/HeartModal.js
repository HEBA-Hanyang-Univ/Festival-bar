import React, {useEffect, useRef, useState} from "react";
import "styles/Modal.scss";
import useOutSideClick from "../useOutSideClick";
import ModalContainer from "../ModalContainer";

function HeartModal({ onClose, selectedBoxes }) {
  const modalRef = useRef(null);
  const [heart, setHeart] = useState(0);

  const handleClose = () => {
    onClose ?.();
  };
  
  const handleHeartIncrement = () => {
    setHeart(prevHeart => prevHeart + 1);
  };

  const handleHeartDecrement = () => {
    if (heart > 0){
      setHeart(prevHeart => prevHeart - 1);
    }
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
        <div className="adminModalWrap" ref={modalRef}>
          <div className="adminModalTitle">
            <span>{selectedBoxes.join(", ")}번 테이블</span>
          </div>
          <div className="adminModalContent timeSet">
            <button onClick={handleHeartDecrement}>-</button>
            <input type="number" value={heart} readOnly />
            <button onClick={handleHeartIncrement}>+</button>
          </div>
          <div className="adminModalBtn">
            <button>
              <span>하트 충전</span>
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default HeartModal;