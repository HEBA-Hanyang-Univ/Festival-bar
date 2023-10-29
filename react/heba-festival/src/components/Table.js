import React from "react";
import "styles/Table.scss";
import tableState from "assets/images/heart.svg";
import HeadImg from "assets/images/head.svg";

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
      <div className="table" style={tableStyle}>
        <div className="tableTitle">
          <span>{this.props.tableNumber}번 테이블</span>
        </div>
        <div className="tableContents">
          <div className="tableState">     
            <img src={tableState} alt="table heart img"></img>
          </div> 
          <div className="tableCount">
            <img src={HeadImg} alt="table head img"></img>
            <span className="double">x</span>
            <span className="headCount">4</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;