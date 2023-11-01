import React, {useState, useRef, useEffect} from "react";
import secureLocalStorage from "react-secure-storage";
import "styles/Modal.scss";
import LockImg from "assets/images/Lock.svg";
import ModalContainer from "./ModalContainer";

function LockModal({ onClose }) {
  const modalRef = useRef(null)
  // 코드가 일치하는지 확인 TODO: 코드 일치하는지 확인하기
  const [code, setCode] = useState('');
  
  useEffect(() => {
    if (code.length === 6) {
      fetch('http://150.230.252.177:5000/get-table', {
        mode: 'cors',
	method: 'POST',
	body: JSON.stringify({
	  token: secureLocalStorage.getItem('token'),
	  code: code,
	}),
	headers: {"Content-Type": "application/json",},
      })
      .then((response) => response.json())
      .then((response) => {
        if (response.result === 'fail') {
	  alert('코드가 일치하지 않습니다!');
	  setCode('');
	} else {
	  secureLocalStorage.setItem('code', code);
	  handleClose();
	}
      });
    }
  }, [code]);

  const handleChange = (event) => {
    setCode(event.target.value);
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
            <input className="enterCodeField" value={code} onChange={handleChange} maxLength="6"></input>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default LockModal;
