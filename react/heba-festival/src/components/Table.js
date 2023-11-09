  import React, { useState, useRef } from "react";
  import "styles/Table.scss";
  import SendHeartModal from "components/Modal/SendHeartModal";
  import Icon from "assets/images/icon.svg";
  import HeartReceived from "assets/images/ReceivedHeart.svg";
  import HeartSent from "assets/images/SendHeart.svg";
  import CoupleMatched from "assets/images/Matched.svg";
  import HeartBroken from "assets/images/BrokenHeart.svg";
  import secureLocalStorage from "react-secure-storage";

  const Table = ({tableData, myGender, huntingStatus, remainedLikes}) => {
      let backgroundColor = "#C8C8C8";
      let genderText = "";
      let statusImg = null;

      const [isOpenSendHeartModal, setIsOpenSendHeartModal] = useState(false);
      let isSendAvailable = true;

      if (myGender === tableData.gender) {
	isSendAvailable = false;
      }

      if (tableData.gender === "male") {
        backgroundColor = "#80C2FF"; // 성별 남성
        genderText = "남성테이블";
      } else if (tableData.gender === "female") {
        backgroundColor = "#FF8FD2"; // 성별 여성
        genderText = "여성테이블";
      } else if (tableData.join) {
        backgroundColor = "#DD7DFF"; // 합석 테이블
        genderText = "";
        statusImg = CoupleMatched;
	isSendAvailable = false;
      } else if (tableData.gender === "mixed") {
        backgroundColor = "#FFC555"; // 성별 혼성 또는 기본값
        genderText = "혼성테이블";
	isSendAvailable = false;
      }
      
      if (huntingStatus === "received") {
        statusImg = HeartReceived;
      } else if (huntingStatus === "sent") {
        statusImg = HeartSent;
	isSendAvailable = false;
      } else if (huntingStatus === "broken") {
	statusImg = HeartBroken;
	isSendAvailable = false;
      }

      let isEmptyTable = false;
      if (tableData.nums === 0 || !tableData.active) {
        isSendAvailable = false;
	isEmptyTable = true;
      }

      // switch
    
      // 스타일 객체 생성
      const tableStyle = {
        backgroundColor: backgroundColor,
      };

      const onClickButton = (modalType) => {
        if (modalType === "sendHeart" && !isEmptyTable) {
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
              <span>{tableData.table_no}번 테이블</span>
              <span className="tableGenderInfo">{genderText}</span>
            </div>
            <div className="tableContents">
              {statusImg ? <img src={statusImg} alt="table status img"></img> : <div style={{width: '2.5rem', height: '2.5rem'}}></div>}
              <div className="tableHeadInfo">
                <img src={Icon}></img>
                <div className="tableHeadInfoSpan">
                  <span>X</span>
                  <span>{tableData.nums}</span>
                </div>
              </div>
            </div>
          </button>
          {isOpenSendHeartModal && (
          <SendHeartModal open={isOpenSendHeartModal} onClose={()=>onCloseModal("sendHeart")}
           tableData={tableData} isSendAvailable={isSendAvailable} remainedLikes={remainedLikes}>
          </SendHeartModal>
          )}
        </div>
      );
  }

  export default Table;
