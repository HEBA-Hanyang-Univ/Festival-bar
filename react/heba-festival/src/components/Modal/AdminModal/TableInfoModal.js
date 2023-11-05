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

  const handleModalOpen = (type) => {
    setZIndex(prevZIndex => prevZIndex + 1);  // 모달이 열릴 때마다 z-index 값 증가
    setModalType(type);
  };

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
            <button className="btnFilled" onClick={() => handleModalOpen('time')}>시간 추가</button>
            <button className="btnFilled" onClick={() => handleModalOpen('heart')}>하트 충전</button>
            <button className="btnFilled" onClick={() => handleModalOpen('joinTable')}>합석 처리</button>
            <button className="btnFilled" onClick={() => handleModalOpen('exit')}>퇴장 처리</button>
          </div>
          { modalType === 'time' && <TimeModal onClose={ () => setModalType(null) }
		                     targetTables={ tableNumber } zIndex={ zIndex }/> }
          { modalType === 'heart' && <HeartModal onClose={ () => setModalType(null) }
		                      targetTables={ tableNumber } zIndex={ zIndex }/> }
	  {/* JoinTableModal's field name targetTable is different from others.  */}
          { modalType === 'joinTable' && <JoinTableModal onClose={ () => setModalType(null) }
		                          targetTable={ tableNumber } zIndex={ zIndex }/> }
          { modalType === 'exit' && <ExitTableModal onClose={ () => setModalType(null) }
		                     targetTables={ tableNumber } zIndex={ zIndex }/> }
        </div>
      </div>
    </ModalContainer>
  )
}

export default TableInfoModal;
