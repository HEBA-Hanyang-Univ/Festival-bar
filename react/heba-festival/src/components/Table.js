import React from "react";
import "styles/Table.scss";
import tableState from "assets/images/heart.svg";
import HeadImg from "assets/images/head.svg";

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let backgroundClass = "tableBackgroundDefault";
    if (this.props.gender === "male") {
      backgroundClass = "tableBackgroundMale";
    } else if (this.props.gender === "female") {
      backgroundClass = "tableBackgroundFemale";
    }

    return (
      <div className="table">
        <div className="tableTitle">
          <span>n번 테이블</span>
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