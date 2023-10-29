import React from "react";
import "styles/Table.scss";
import Icon from "assets/images/icon.svg";
import HeartRecieved from "assets/images/ReceivedHeart.svg";
import HeartSended from "assets/images/SendHeart.svg";
import CoupleMatched from "assets/images/Matched.svg";
import HeartBroken from "assets/images/BrokenHeart.svg";

class Table extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let backgroundColor = "#E2E2E2";

    if (this.props.gender === "male") {
      backgroundColor = "#87DEFF"; // 성별 남성
    } else if (this.props.gender === "female") {
      backgroundColor = "#FFC5F1"; // 성별 여성
    } else if (this.props.huntingSuccess) {
      backgroundColor = "#9A66FF"; // 합석 테이블
    } else if (this.props.gender === "mixed") {
      backgroundColor = "#F9F16A"; // 성별 혼성 또는 기본값
    }
  
    // 스타일 객체 생성
    const tableStyle = {
      backgroundColor: backgroundColor,
    };

    return (
      <button className="table" style={tableStyle}>
        <div className="tableTitle">
          {/* TODO: 테이블 정보값에 따라서 테이블 번호, 여성,남성,혼성테이블 구분 */}
          <span>n</span>
          <span>번 테이블</span>
          <span className="tableGenderInfo">여성테이블</span>
        </div>
        <div className="tableContents">
          <img src={HeartRecieved}></img>
          <div className="tableHeadInfo">
            <img src={Icon}></img>
            <div className="tableHeadInfoSpan">
              <span>X</span>
              <span>2</span>
            </div>
          </div>
        </div>
      </button>
    );
  }
}

export default Table;