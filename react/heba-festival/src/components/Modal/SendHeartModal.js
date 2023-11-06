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
function SendHeartModal({ onClose, tableNumber, tableGender, headCount, tableIntro, isSendAvailable, remainedLikes }) {
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
        received_table: tableNumber,
      }),
    })
    .then((res) => res.json())
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
        <div className="modalWrap" ref={modalRef} style={{height: '21rem'}}>
          <div className="modalTitle">
            <span style={{fontWeight: '900', fontSize: '1.8rem'}}>{tableNumber}번 테이블</span>
          </div>
          <div className="modalContent">
            <div className="SendHeartTop">
              <div className="SendHeartImgBox">
	        { tableGenderImg != null ? <img src={tableGenderImg} alt="table gender img"/> : <div></div> }
              </div>
              <div className="SendHeartSpan">
                <span>x</span>
                <span style={{marginTop: '2rem'}}>{headCount}</span>
              </div>
            </div>
            <div className="sendHeartMiddle"> 
              <div className="SendHeartIntroduce">
                <span>{tableIntro}</span>
              </div>
            </div>
            <div className="modalBtnBox">
	            <button className="btnFilled" style={{marginTop: '-1rem'}} type="submit" onClick={remainedLikes>0 ? (isSendAvailable ? handleSubmit : ()=>alert('보내기가 불가능한 테이블입니다')) : ()=>alert('남은 하트가 없습니다')}>
                <img src={SendHeartImg} alt="sendheart img"></img>
              </button>
              <button className="btnBlank  "onClick={handleClose}>
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
