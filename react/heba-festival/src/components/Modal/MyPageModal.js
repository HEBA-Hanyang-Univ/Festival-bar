import React, {useEffect, useRef, useState} from "react";
import "styles/Modal.scss";
import useOutSideClick from "./useOutSideClick";
import ModalContainer from "./ModalContainer";
import CloseBtn from "assets/images/close.svg";
import QuantityControl from "components/QuantityControl";
import Man from "assets/images/Man.svg";
import Woman from "assets/images/Woman.svg";

function MyPageModal({ onClose }) {
  const modalRef = useRef(null)
  const handleClose = () => {
    onClose ?.();
  };

  const [quantity, setQuantity] = useState(0);
  const [modifyIntroduce, setModifyIntroduce] = useState("");

  const handleModifyIntroduce = (event) => {
    setModifyIntroduce(event.target.value);
  }

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(quantity + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
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
    <ModalContainer>
      <div className="overlay">
        <div className="myPageWrap modalWrap" ref={modalRef}>
          <div className="closeBtnBox">
            <button className="closeBtn">
              <img src={CloseBtn} alt="x img"></img>
            </button>
          </div>
          <div className="myPageTitle">
            <span>마이페이지</span>
          </div>
          <div className="myPageContent">
            <div className="modifyCount">
              <div className="genderImgBox">
                <img src={Man} alt="man img"></img>
                <span>남자</span>
              </div>
              <div className="modifyCountBox">
                <span>인원 수를 선택하세요</span>
                <QuantityControl
              quantity={quantity}
              onIncrement={() => handleQuantityChange("increment")}
              onDecrement={() => handleQuantityChange("decrement")}>
            </QuantityControl>
              </div>
            </div>
            <div className="modifyCount" style={{marginTop: '1.8rem'}}>
              <div className="genderImgBox">
                <img src={Woman} alt="woman img" style={{width : '7.5rem', height: '7rem', marginRight: '-1rem', marginLeft:'-0.4rem'}}></img>
                <span style={{marginTop: '-0.5rem'}}>여자</span>
              </div>
              <div className="modifyCountBox">
                <span>인원 수를 선택하세요</span>
                <QuantityControl
              quantity={quantity}
              onIncrement={() => handleQuantityChange("increment")}
              onDecrement={() => handleQuantityChange("decrement")}>
            </QuantityControl>
              </div>
            </div>
            <div className="modifyIntroduce">
              <div className="modifyIntroduceTitle">
                <span>한줄 소개</span>
                <textarea name="introduce" cols={"20"} rows={"2"} spellCheck="false" value={modifyIntroduce} onChange={handleModifyIntroduce}></textarea>
              </div>
            </div>
          </div>
          <button className="myPageBtn" type="submit">
            <span>수정하기</span>
          </button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default MyPageModal;