import React from "react";
import "styles/Error.scss";
import "styles/common.scss";
import ErrorImg from "assets/images/error.png";
import secureLocalStorage from "react-secure-storage";


export const Error = () => {
  secureLocalStorage.clear(); // remove all the local storage if error occurs
  return (
    <div className="errorWrap">
      <div className="errorBox">
        <div className="errorImg">
          <img src={ErrorImg} alt="error img"></img>
        </div>
        <div className="errorMessage">
          <span>
            일시적인 오류가 발생하였습니다.
            <br></br>
            QR 코드를 다시 찍어주세요!
            <br></br>
            이용에 불편을 드려 죄송합니다.
          </span>
        </div>
      </div>
    </div>
  )
}
