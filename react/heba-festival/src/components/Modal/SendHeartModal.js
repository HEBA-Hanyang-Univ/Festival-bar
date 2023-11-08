import React, {useEffect, useRef} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";
import Couple from "assets/images/Couple.svg";
import SendHeartImg from "assets/images/SendHeart.svg";
import secureLocalStorage from "react-secure-storage";

// 원하는 테이블에 하트 보내기
function SendHeartModal({ onClose, tableData, isSendAvailable, remainedLikes }) {
  const modalRef = useRef(null)
  const handleClose = () => {
    onClose ?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://150.230.252.177:5000/send-like', {
      mode:'cors',
      method:'POST',
      headers:{'Content-Type':'application/json',},
      body:JSON.stringify({
        token: secureLocalStorage.getItem('token'),
        code: secureLocalStorage.getItem('code'),
        received_table: tableData.table_no,
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      if (res && res.result === 'ok') {
        alert('성공!');
      } else {
	alert('보내기에 실패했습니다. 관리자에게 문의해주세요.');
      }
      return res;
    })
    .then((res) => { handleClose(); })
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
        <div className="modalWrap" ref={modalRef} style={{height: '21rem'}}>
          <div className="modalTitle">
            <span style={{fontWeight: '900', fontSize: '1.8rem'}}>{tableData.table_no}번 테이블</span>
          </div>
          <div className="modalContent">
            <div className="SendHeartTop">
              <div className="SendHeartImgBox">
	        { tableGenderImg != null ? <img src={tableGenderImg} alt="table gender img"/> : <div></div> }
              </div>
              <div className="SendHeartSpan">
                <span>x</span>
                <span style={{marginTop: '2rem'}}>{tableData.nums}</span>
              </div>
            </div>
            <div className="sendHeartMiddle"> 
              <div className="SendHeartIntroduce">
                <span>{tableData.note}</span>
              </div>
            </div>
            <div className="modalBtnBoxSendHeart">
	            <button className="btnFilled" type="submit" onClick={remainedLikes>0 ? (isSendAvailable ? handleSubmit : ()=>alert('보내기가 불가능한 테이블입니다')) : ()=>alert('남은 하트가 없습니다')}>
                <img src={SendHeartImg} alt="sendheart img"></img>
              </button>
              <button className="btnBlank" onClick={handleClose}>
                <span className="btnBlankSpan">취소</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default SendHeartModal;
