import React, {useEffect, useRef} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";
import Couple from "assets/images/Couple.svg";

// 원하는 테이블에 하트 보내기
function SendHeartModal({ onClose, tableNumber, tableGender }) {
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

  let tableGenderImg;
  if (tableGender === "male") {
    tableGenderImg = Man;
  } else if (tableGender === "female") {
    tableGenderImg = Woman;
  } else if (tableGender === "couple") {
    tableGenderImg = Couple;
  } else {
    tableGenderImg = null;
  }

  return (
    <ModalContainer>
      <div className="overlay">
        <div className="modalWrap" style={{height: '16rem'}} ref={modalRef}>
          {/* TODO: 해당 테이블 번호 받아오기 */}
          <div className="modalTitle">
            <span>{tableNumber}번 테이블</span>
          </div>
          <div className="modalContent">
            <div className="SendHeartTop">
              <div className="SendHeartImgBox">
                <img src={tableGenderImg} alt="table gender img"></img>
              </div>
              <div className="SendHeartSpan">
                {/* TODO: 해당 테이블 인원 수  */}
                <span>x3</span>
              </div>
            </div>
            <div className="sendHeartMiddle"> 
              <div className="SendHeartIntroduce">
                {/* TODO: 해당 테이블 소개 */}
                <span>우리랑 술 먹을 사람~</span>
              </div>
            </div>
            {/* TODO: 해당 테이블에 하트 보내기 */}
            <div className="modalBtnBox">
              <button className="btnFilled">
                <span>하트 보내기</span>
              </button>
              <button className="btnBlank" onClick={handleClose}>
                <span>취소</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default SendHeartModal;
