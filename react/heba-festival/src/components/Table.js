  import React, { useState } from "react";
  import "styles/Table.scss";
  import SendHeartModal from "components/Modal/SendHeartModal";
  import Icon from "assets/images/icon.svg";
  import HeartRecieved from "assets/images/ReceivedHeart.svg";
  import HeartSended from "assets/images/SendHeart.svg";
  import CoupleMatched from "assets/images/Matched.svg";
  import HeartBroken from "assets/images/BrokenHeart.svg";

  const Table = ({tableNumber, gender, huntingSuccess, status, headCount}) => {
      let backgroundColor = "#C8C8C8";
      let genderText = "";
      let statusImg = null;

      const [isOpenSendHeartModal, setIsOpenSendHeartModal] = useState(false);

      if (gender === "male") {
        backgroundColor = "#80C2FF"; // 성별 남성
        genderText = "남성테이블";
      } else if (gender === "female") {
        backgroundColor = "#FF8FD2"; // 성별 여성
        genderText = "여성테이블";
      } else if (huntingSuccess) {
        backgroundColor = "#DD7DFF"; // 합석 테이블
        genderText = "";
        statusImg = CoupleMatched;
      } else if (gender === "mixed") {
        backgroundColor = "#FFC555"; // 성별 혼성 또는 기본값
        genderText = "혼성테이블";
      }

      // switch
    
      // 스타일 객체 생성
      const tableStyle = {
        backgroundColor: backgroundColor,
      };

      const onClickButton = (modalType) => {
        if (modalType === "sendHeart") {
          setIsOpenSendHeartModal(true);
        }
      };

      const onCloseModal = (modalType) => {
        if (modalType === "sendHeart") {
          setIsOpenSendHeartModal(false);
        }
      };

      return (
        <div className="tableWrap">
          <button className="table" style={tableStyle} onClick={() => onClickButton("sendHeart")}>
            <div className="tableTitle">
              {/* TODO: 테이블 정보값에 따라서 테이블 번호, 여성,남성,혼성테이블 구분 */}
              <span>{tableNumber}번 테이블</span>
              <span className="tableGenderInfo">{genderText}</span>
            </div>
            <div className="tableContents">
              {statusImg ? <img src={statusImg} alt="table status img"></img> : <div style={{width: '2.5rem', height: '2.5rem'}}></div>}
              <div className="tableHeadInfo">
                <img src={Icon}></img>
                <div className="tableHeadInfoSpan">
                  <span>X</span>
                  <span>{headCount}</span>
                </div>
              </div>
            </div>
          </button>
          {isOpenSendHeartModal && (
          <SendHeartModal open={isOpenSendHeartModal} onClose={()=> onCloseModal("sendHeart")}></SendHeartModal>
          )}
        </div>
      );
  }

  export default Table;
