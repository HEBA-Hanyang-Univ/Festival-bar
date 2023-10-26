import React, {useEffect, useRef} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
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
          <div className="modalTitle">
            <span>하트 충전하기</span>
          </div>
          <div className="modalContent heartContent">
            <span style={{fontSize: '1rem'}}>
              하트는 칩 4개로 구매 가능합니다.
              <br></br>
              칩이 있으시면 '직원 호출'을
              <br></br>
              칩이 없으시면 '주문하기'를 클릭해
              <br></br>
              칩을 구매해 주세요.
            </span>
            {/* TODO: 식파마 페잊, 직원 호출 로직 */}
            <div className="heartChargeBtnBox">
              <button className="whiteBtn" onClick={handleClose}>
                <span>직원호출</span>
              </button>
              <button>
                <Link to={"/landing"} style={{textDecoration: 'none'}}>
                  <span>주문하기</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default HeartChargeModal;