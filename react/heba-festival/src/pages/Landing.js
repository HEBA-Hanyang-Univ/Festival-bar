import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "styles/common.scss";
import "styles/Landing.scss";
import Order from "assets/images/order.png";
import Hunt from "assets/images/hunt.png";
import secureLocalStorage from "react-secure-storage";

export const Landing = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState("/error");
  const token = secureLocalStorage.getItem('token');
  if (token == null) {
    navigate('/error');
  }

  const fetchData = async() => {
    try {
      let response = await fetch('http://150.230.252.177:5000/get-table', {
        mode:'cors',
	method:'POST',
	headers:{'Content-Type':'application/json',},
	body:JSON.stringify({'token':token,}),
      })
      .then((res) => res.json())
      .then((response) => {
        if (response.result.hasOwnProperty('error')) {
          navigate('/error');
        } else {
	  if (response.result.active === true) {
	    setLink('/home');
	  } else {
	    setLink('/checkin');
	  }
	  console.log(link);
	}
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="homeWrap">
      <div className="homeTitle">
        <span>
          바른생각
          <br></br>
          바른주점
        </span>
      </div>
      <div className="homeSubtitle">
        <span>당신의 운명을 찾아보세요.</span>
      </div>
      <div className="homeBtnContainer">
        <button className="linkSicpama">
	  <Link to ={"/home"} style={{textDecorationLine: "none"}}>
            <div className="homeBtnTitle">
              <span>주문하기</span>
              <img src={Order} alt="order img"></img>
            </div>
          </Link>
        </button>
        <button className="linkHEBA">
          <Link to={link} style={{textDecorationLine:"none"}}>
            <div className="homeBtnTitle">
              <span>헌팅하기</span>
              <img src={Hunt} alt="hunt img"></img>
            </div>
          </Link>
        </button>
      </div>
    </div>
  
  )
}
