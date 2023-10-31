import React, {useState, useRef} from "react";
import "styles/Modal.scss";
import LockImg from "assets/images/Lock.svg";
import ModalContainer from "./ModalContainer";

function LockModal({ onClose }) {
  const modalRef = useRef(null)
  // 코드가 일치하는지 확인 TODO: 코드 일치하는지 확인하기
  const [code, setCode] = useState('');
  const correctCode = '1234'  // 테스트용

  const handleChange = (event) => {
    setCode(event.target.value);
    if (event.target.value.length === 4) {
      if (event.target.value === correctCode) {
        alert('코드가 일치합니다!');
        handleClose();  // 코드 일치 시 모달 해제
      } else {
        alert('코드가 일치하지 않습니다.');
        setCode('');
      }
    }
  };

  const handleClose = () => {
    onClose ?.();
  };

  return (
    <ModalContainer>
      <div className="overlay">
        <div className="modalWrap" ref={modalRef}>
          <div className="modalTitle">
            {/* TODO: 해당 테이블 번호 토큰값에 따라 받아오기 */}
            <span>n번 테이블</span>
          </div>
          <div className="lockModalImg">
            <img src={LockImg} alt="lock img"></img>
          </div>
          <div className="enterCode">
            <input className="enterCodeField" type="password" value={code} onChange={handleChange} maxLength="4"></input>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default LockModal;