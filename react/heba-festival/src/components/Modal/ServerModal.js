import React, {useEffect, useRef, useState} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import WaitForServer from "./WaitForServer";
import FailedCallServerModal from "./FailedCallServerModal";
import secureLocalStorage from "react-secure-storage";

function ServerModal({ onClose }) {
  const modalRef = useRef(null)
  const [isOpenWaitForServer, setIsOpenWaitForServer] = useState(false);
  const [isOpenFailedModal, setIsOpenFailedModal] = useState(false);
  const handleClose = () => {
    setIsOpenWaitForServer(true);
    onClose ?.()
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://150.230.252.177:5000/call', {
      mode: 'cors',
      method: 'POST',
      headers: {'Content-Type':'application/json',},
      body: JSON.stringify({
        token: secureLocalStorage.getItem('token'),
        code: secureLocalStorage.getItem('code'),
        type: 'call',
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.result && res.result === 'ok') {
        // TODO : open wait server modal
        handleClose();
      } else {  
	alert('호출에 실패했습니다... 관리자에게 문의해주세요');
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

  return (
    <>
    <ModalContainer>
      <div className="overlay">
        <div className="modalWrap" ref={modalRef} style={{width: '25rem'}}>
          <div className="modalTitle serverModalTitle">
            <span style={{fontWeight: '800'}}>직원 호출</span>
          </div>
          <div className="modalContent serverContent">
            <span>직원을 호출하시겠습니까?</span>
            <button type="submit" onClick={handleSubmit}>
              <span>직원호출</span>
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
    {isOpenWaitForServer && <WaitForServer />}
    </>
  )
}

export default ServerModal;
