import React, { useState } from "react";  
import { Link } from "react-router-dom";
import "styles/CheckIn.scss";
import "styles/common.scss";
import Male from "assets/images/male.png";
import Female from "assets/images/female.png";
import Mixed from "assets/images/mixed.png";

export const CheckIn = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [introduce, setIntroduce] = useState("");
  const [agree, setAgree] = useState(false);
  const [token, setToken] = useState("");
  // 에러메시지 상태 추가
  
  // 하나의 성별만 선택
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  } 

  // + - 컨트롤 버튼
  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(quantity + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const handleIntroduceChange = (event) => {
    setIntroduce(event.target.value);
  }

  const handleAgreeChange = (event) => {
    setAgree(event.target.checked);
  }

  const handleSubmit = (e) => {
    e. preventDefault();

    const data = {
      token: token,
      gender: selectedGender,
      nums: quantity,
      note: introduce,
      photo: agree,
    };

    fetch("/set-table", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })

    .
  }


  return (
    <div id="checkInWrap">
      <div className="checkInTitle">
        <span>Update Your Profile</span>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="checkInButtonBox">
          <div className="selectBox genderSelect">
            <div className="selectBoxTitle">
              <span className="highlight">*</span>
              <span>성별</span>
            </div>
            <div className="genderBtn">
              <button
                className={`customRadioBtn maleBtn ${selectedGender === "male" ? "selected" : ""}`}
                data-name="male"
                onClick={() => handleGenderSelect("male")}
              >
                <img src={Male} style={{width:'2.125rem',height:'2.8125rem'}} alt="male img"/>
              </button>
              <button
                className={`customRadioBtn femaleBtn ${selectedGender === "female" ? "selected" : ""}`}
                data-name="female"
                onClick={() => handleGenderSelect("female")}
              >
                <img src={Female} style={{width:'2.625rem',height:'2.625rem'}} alt="female img"/>
              </button>            
              <button
                className={`customRadioBtn mixedBtn ${selectedGender === "mixed" ? "selected" : ""}`}
                data-name="mixed"
                onClick={() => handleGenderSelect("mixed")}
              >
                <img src={Mixed} style={{width:'5rem',height:'2.5rem'}} alt="mixed img"/>
              </button>
            </div>
          </div>
          <div className="selectBox headSelect">
            <div className="selectBoxTitle">
              <span className="highlight">*</span>
              <span>인원 수</span>
            </div>
            <div className="inputGroup">
              <button type="button" className="btnMinus" onClick={() => handleQuantityChange('decrement')}>-</button> 
              <input type="number" step={"1"} max={"15"} value={quantity} name="quantity" className="quantityField"></input>
              <button type="button" className="btnPlus" onClick={() => handleQuantityChange('increment')}>+</button>
            </div>
          </div>
        </div>
        <div className="selfIntroduceContent">
          <div className="selfIntroduceTitle">
            <span>한 줄 소개(선택 사항)</span>
          </div>
          <textarea name="introduce" cols={"45"} rows={"3"} spellCheck="false" value={introduce} onChange={handleIntroduceChange}></textarea>
        </div>
        <div className="filmAgree">
          <div className="filmAgreeTitle">
            <span>촬영 동의서 (선택 사항)</span>
          </div>
          <div className="filmAgreeContent">
            <h4>저희 주점에 오신 것을 환영합니다!</h4><br></br>
            안녕하세요 먼저 저희 바른생각 바른주점에 찾아와 주신 모든 분들께 감사드립니다.
            <br></br><br></br>
            다름이 아니라, 저희 주점에서 미디어 홍보 자료 제작을 위해 촬영을 진행하고자 합니다.
            <br></br>
            촬영에 동의하시는 테이블에는 ~~의 혜택을 드리고 있으니, 괜찮으시다면 동의 체크박스를 눌러주세요!
            <br></br><br></br>
            저희 주점에서 즐거운 추억 많이 만들어가시길 바랍니다.
            <br></br>
            감사합니다.
          </div>
          <div className="agreeCheckBox">
            <input type="checkbox" id="agree" name="agree" checked={agree} onChange={handleAgreeChange}></input>
            <label htmlFor="agree">Agree</label>
          </div>
        </div>
        <button className="submitBtn" type="submit" value={"Submit"}>
          {selectedGender && quantity > 0 ? (
            <Link to={"/landing"} style={{textDecorationLine: "none",}}><span>Submit</span></Link>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
}