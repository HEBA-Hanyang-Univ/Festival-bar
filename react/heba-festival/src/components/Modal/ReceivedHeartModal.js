import React, {useEffect, useRef} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";
import Couple from "assets/images/Couple.svg";

// 원하는 테이블에 하트 보내기
function ReceivedHeartModal({ onClose, tableData }) {
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
  if (tableData.gender === "male") {
    tableGenderImg = Man;
  } else if (tableData.gender === "female") {
    tableGenderImg = Woman;
  } else {
    tableGenderImg = null;
  }

  return (
    <ModalContainer>
      <div className="overlay">
        <div className="modalWrap" style={{height: '16rem'}} ref={modalRef}>
          {/* TODO: 하트를 보낸 테이블 번호 받아오기 */}
          <div className="modalTitle">
            <span>{tableData.table_no}번 테이블</span>
          </div>
          <div className="modalContent">
            <div className="SendHeartTop">
              <div className="SendHeartImgBox">
                <img src={tableGenderImg} alt="table gender img"></img>
              </div>
              <div className="SendHeartSpan">
                {/* TODO: 하트를 보낸 테이블 인원 수  */}
                <span>x{tableData.nums}</span>
              </div>
            </div>
            <div className="sendHeartMiddle"> 
              <div className="SendHeartIntroduce">
                {/* TODO: 하트를 보낸 테이블 소개 */}
                <span>{ tableData.note }</span>
              </div>
            </div>
            {/* TODO: 하트 수락/거절 */}
            <div className="modalBtnBox">
              <button className="btnFilled">
                <span>YES</span>
              </button>
              <button className="btnBlank" onClick={handleClose}>
                <span>NO</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ReceivedHeartModal;
