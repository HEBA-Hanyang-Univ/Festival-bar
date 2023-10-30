import React, { useState, useEffect } from "react";  
import { Link, useNavigate } from "react-router-dom";
import "styles/CheckIn.scss";
import "styles/common.scss";
import Man from "assets/images/Man.svg";
import ManSelected from "assets/images/ManSelcted.svg";
import Woman from "assets/images/Woman.svg";
import WomanSelected from "assets/images/WomanSelected.svg";
import Couple from "assets/images/Couple.svg";
import CoupleSelected from "assets/images/CoupleSelected.svg";
import QuantityControl from "components/QuantityControl";
import secureLocalStorage from "react-secure-storage";

//  TODO : 서버로부터 테이블 번호 요청 후 렌더링

export const CheckIn = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [introduce, setIntroduce] = useState("");
  const [friendCode, setfriendCode] = useState("");
  const [agree, setAgree] = useState(false);
  const token = secureLocalStorage.getItem('token');
  const navigate = useNavigate();
  
  // check token
  useEffect(() => {
    if (token == null) {
      navigate('/error');
    }
  });

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

  const handleFriendCodeChange = (event) => {
    setfriendCode(event.target.value);
  }

  const handleAgreeChange = (event) => {
    setAgree(event.target.checked);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedGender == null || quantity === 0) return;

    const data = {
      token: token,
      gender: selectedGender,
      nums: quantity,
      note: introduce,
      photo: agree,
      referrer: friendCode,
    };

    fetch("http://150.230.252.177:5000/set-table", {
      mode:'cors',
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })

      .then((response) => response.json())
      .then((result) => {
        console.log("서버 응답: ", result);

        if (result.result && result.result.error) {
          console.error("서버 에러: ", result.reult.error)
        }
      })

  }

  return (
    <div id="checkInWrap">
      <div className="checkInTitle">
        <span>프로필을 설정하세요</span>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="checkInButtonBox">
          <div className="selectBox genderSelect">
            <div className="selectBoxTitle">
              <span>성별을 선택하세요</span>
            </div>
            <div className="genderBtn">
              <button
                className={`customRadioBtn maleBtn ${selectedGender === "male" ? "selected" : ""}`}
                data-name="male"
                onClick={() => handleGenderSelect("male")}
              >
                {selectedGender === "male" ? (
                  <img src={ManSelected} style={{width: '5.5rem', height: '4.5rem', marginBottom: '0.6rem'}} alt="male selected img" />
                ) :
                  <img src={Man} style={{width: '5.5rem', height: '4.5rem', marginBottom: '0.6rem'}} alt="male img" />
                }
                <span>남자</span>
              </button>
              <button
                className={`customRadioBtn femaleBtn ${selectedGender === "female" ? "selected" : ""}`}
                data-name="female"
                onClick={() => handleGenderSelect("female")}
              >
                {selectedGender === "female" ? (
                  <img src={WomanSelected} style={{width: '6.5rem', height: '4.5rem', marginBottom: '0.6rem'}} alt="female selected img" />
                ) :
                  <img src={Woman} style={{width: '6.5rem', height: '4.5rem', marginBottom: '0.6rem'}} alt="female img" />
                }
                <span style={{marginLeft: '2rem'}}>여자</span>
              </button>            
              <button
                className={`customRadioBtn mixedBtn ${selectedGender === "mixed" ? "selected" : ""}`}
                data-name="mixed"
                onClick={() => handleGenderSelect("mixed")}
              >
                {selectedGender === "mixed" ? (
                  <img src={CoupleSelected} style={{width: '9rem', height: '5.3rem', marginTop: '0.6rem', marginBottom: '0.23rem'}} alt="mixed selected img" />
                ) :
                  <img src={Couple} style={{width: '9rem', height: '5.3rem', marginTop: '0.6rem', marginBottom: '0.4rem'}} alt="mixed img" />
                }                
                <span style={{marginLeft: '3rem'}}>혼성</span>
              </button>
            </div>
          </div>
          <div className="selectBox headSelect">
            <div className="selectBoxTitle">
              <span>인원 수를 선택하세요</span>
            </div>
            <QuantityControl
              quantity={quantity}
              onIncrement={() => handleQuantityChange("increment")}
              onDecrement={() => handleQuantityChange("decrement")}>
            </QuantityControl>
          </div>
        </div>
        <div className="selfIntroduceContent">
          <div className="selfIntroduceTitle">
            <span className="spanMiddle">한줄 소개</span>
            <span className="spanSmall">(선택 사항)</span>
          </div>
          <textarea name="introduce" cols={"42"} rows={"1"} spellCheck="false" value={introduce} onChange={handleIntroduceChange}></textarea>
        </div>
        <div className="friendCode">
          <div className="friendCodeTitle">
            <span className="spanMiddle">지인 코드 입력</span>
            <span className="spanSmall">(선택 사항)</span>
          </div>
          <textarea name="friendCode" cols={"42"} rows={"1"} spellCheck="false" value={friendCode} onChange={handleFriendCodeChange}></textarea>
        </div>
        <div className="filmAgree">
          <div className="filmAgreeTitle">
            <span className="spanMiddle">촬영 동의서</span>
            <span className="spanSmall">(선택 사항)</span>
          </div>
          <div className="filmAgreeContent">
            저희 주점에 오신 것을 환영합니다!
            <br></br>
            안녕하세요. 바른주점에 찾아와주셔서 감사합니다.
            <br></br>
            저희 주점에서는 미디어 홍보 자료 제작을 위해 촬영을 진행하고 있습니다.
            <br></br>
            촬영에 동의하시는 테이블에는 소정의 혜택을 드리고 있으니, 괜찮으시다면 동의를 체크해주세요.
            <br></br>
            저희 주점에서 좋은 인연과 추억 많이 만들어 가시면 좋겠습니다.
            <br></br>
            감사합니다.
          </div>
          <div className="agreeCheckBox">
            <input type="checkbox" id="agree" name="agree" checked={agree} onChange={handleAgreeChange}></input>
            <label htmlFor="agree">동의합니다</label>
          </div>
        </div>
        <button className="submitBtn" type="submit" value={"Submit"} onClick={handleSubmit}>
          {selectedGender && quantity > 0 ? (
            <Link to={"/landing"} className="submitBtnChecked"><span >제출하기</span></Link>
          ) : (
            <span>제출하기</span>
          )}
        </button>
      </form>
    </div>
  );
}
