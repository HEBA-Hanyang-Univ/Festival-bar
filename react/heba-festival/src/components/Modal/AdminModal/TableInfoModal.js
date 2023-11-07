import React, {useEffect, useRef, useState} from "react";
import "styles/Modal.scss";
import useOutSideClick from "../useOutSideClick";
import ModalContainer from "../ModalContainer";
import TimeModal from "./TimeModal";
import HeartModal from "./HeartModal";
import ExitTableModal from "./ExitTableModal";
import JoinTableModal from "./JoinTableModal";

function TableInfoModal({ onClose, tableNumber, nums, startTime, endTime, code, referrer }) {
  const modalRef = useRef(null);
  const [modalType, setModalType] = useState(null);
  const [zIndex, setZIndex] = useState(1000);
  const [isOpenTimeModal, setIsOpenTimeModal] = useState(false);
  const [isOpenHeartModal, setIsOpenHeartModal] = useState(false);
  const [isOpenExitModal, setIsOpenExitModal] = useState(false); 
  const [isOpenJoinTableModal, setIsOpenJoinTableModal] = useState(false);

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

  const handleModalOpen = (modalType) => {
    if (modalType === "time") {
      setIsOpenTimeModal(true);
    } else if (modalType === "heart") {
      setIsOpenHeartModal(true);
    } else if (modalType === "exit") {
      setIsOpenExitModal(true);
    } else if (modalType === "joinTable") {
      setIsOpenJoinTableModal(true);
    }
  }

  const onCloseModal = (modalType) => {
    if (modalType === "time") {
      setIsOpenTimeModal(false);
      handleClose();
    } else if (modalType === "heart") {
      setIsOpenHeartModal(false);
      handleClose();
    } else if (modalType === "exit") {
      setIsOpenExitModal(false);
      handleClose();
    } else if (modalType === "joinTable") {
      setIsOpenJoinTableModal(false);
      handleClose();
    }
  }

  return (
    <ModalContainer>
      <div className="overlay">
        <div className="adminModalWrap" style={{width: '60rem'}} ref={modalRef}>
          <div className="adminModalTitle">
            <span className="recommend-id">({ code })</span>
            <span>{ tableNumber }번 테이블</span>
            <span className="recommend-name">{ referrer }</span>
          </div>
          <div className="tableInfoBox">
            <span className="tableInfo">
              인원 수 : { nums +  '명'}
              <br></br>
              입장 시간 : { startTime }
              <br></br>
              {/* 퇴장 시간 설정 */}
              퇴장 시간 : { endTime  }
            </span>
          </div>
          <div className="adminBtnBox tableInfoBtn">
            {/* 시간 추가 */}
            {!isOpenTimeModal && (
              <button className="btnFilled" onClick={() => handleModalOpen('time')}>
                시간 추가
              </button>
            )}
            {isOpenTimeModal && (
              <TimeModal onClose={() => onCloseModal('time')}></TimeModal>
            )}

            {/* 하트 충전 */}
            {!isOpenHeartModal && (
              <button className="btnFilled" onClick={() => handleModalOpen('heart')}>
                하트 충전
              </button>
            )}
            {isOpenHeartModal && (
              <HeartModal onClose={() => onCloseModal('heart')}></HeartModal>
            )}

            {/* 합석 처리 */}
	          {/* JoinTableModal's field name targetTable is different from others.  */}
            {!isOpenJoinTableModal && (
              <button className="btnFilled" onClick={() => handleModalOpen('joinTable')}>
                합석 처리
              </button>
            )}
            {isOpenJoinTableModal && (
              <JoinTableModal onClose={() => onCloseModal('joinTable')}></JoinTableModal>
            )}
            
            {/* 퇴장 처리 */}
            {!isOpenExitModal && (
              <button className="btnFilled" onClick={() => handleModalOpen('exit')}>
                퇴장 처리
              </button>
            )}
            {isOpenExitModal && (
              <ExitTableModal onClose={() => onCloseModal('exit')}></ExitTableModal>
            )}
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default TableInfoModal;
