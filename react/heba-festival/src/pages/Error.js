import React from "react";
import "styles/Error.scss";
import "styles/common.scss";
import ErrorImg from "assets/images/Tiger.svg";
import secureLocalStorage from "react-secure-storage";


export const Error = () => {
  secureLocalStorage.clear(); // remove all the local storage if error occurs
  return (
    <div className="errorOverlay">
      <div className="errorWrap">
        <div className="errorBox">
          <div className="errorImg">
            <img src={ErrorImg} alt="error img"></img>
          </div>
          <div className="errorMessage">
            <span>
              크앙! 일시적인 오류다흥!
              <br></br>
              QR 코드를 다시 찍으라흥!
              <br></br>
              이용에 불편을 줘서 미안하다흥!
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
