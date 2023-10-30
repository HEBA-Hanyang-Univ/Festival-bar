import React from "react";
import "styles/Error.scss";
import "styles/common.scss";
import ErrorImg from "assets/images/Tiger.svg";
import secureLocalStorage from "react-secure-storage";


export const Error = () => {
  secureLocalStorage.removeItem("token");    // remove token and table_no if error occurs
  secureLocalStorage.removeItem("table_no"); // but don't erase start_time to check his/her entrance time(use it to auth user currently)
  
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
