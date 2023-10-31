import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "styles/common.scss";
import "styles/Landing.scss";
import TigerImg from "assets/images/Tiger.svg";
import Logo from "assets/images/Logo.svg";
import secureLocalStorage from "react-secure-storage";
import LockModal from "components/Modal/LockModal";

export const Landing = () => {
  const navigate = useNavigate();
  const [link, setLink] = useState("/error");
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const token = secureLocalStorage.getItem('token');
  if (token == null) {
    navigate('/error');
  }

  const fetchData = async() => {
    try {
      await fetch('http://150.230.252.177:5000/get-table', {
        mode:'cors',
	method:'POST',
	headers:{'Content-Type':'application/json',},
	body:JSON.stringify({'token':token,}),
      })
      .then((res) => res.json())
      .then((response) => {
        if (response.result === 'fail') {
          navigate('/error');
        } else {
	  if (response.result.active === true) {
	    setLink('/home');
	  } else {
	    setLink('/checkin');
	  }
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
      {/* 랜딩페이지 들어가자마자 열리도록? */}
      {isModalOpen && <LockModal onClose={handleCloseModal} />}
      <div className="homeImg">
        <img src={TigerImg} alt="tiger img"></img>
      </div>
      <div className="homeTitle">
        <img src={Logo} alt="logo"></img>
      </div>
      <div className="homeSubtitle">
        <span>올바른 만남이 모여 인연이 되다.</span>
      </div>
      <div className="homeBtnContainer">
        <button className="linkSicpama">
	  <Link to ={"/home"} style={{textDecorationLine: "none"}}>
            <div className="homeBtnTitle">
              <span>주문하기</span>
            </div>
          </Link>
        </button>
        <button className="linkHEBA">
          <Link to={link} style={{textDecorationLine:"none"}}>
            <div className="homeBtnTitle">
              <span>헌팅하기</span>
            </div>
          </Link>
        </button>
      </div>
    </div>
  
  )
}
