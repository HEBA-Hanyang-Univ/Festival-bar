import React,{ useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export const Enter = () => {
  const { token } = useParams();
  let isValid = false;
  const navigate = useNavigate();
  
  const fetchData = async() => {
    try {
      let response = await fetch("http://150.230.252.177:5000/get-table", {
	mode:'cors',
        method:"POST",
        body:JSON.stringify({
          'token': token,
        }),
        headers: { "Content-Type": "application/json", },
      });
      response = await response.json();
      if (!response.result.hasOwnProperty('error')) {
        secureLocalStorage.setItem("token", token);
	secureLocalStorage.setItem("table_no", response.result.table_no);
        isValid = true;
      }
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    fetchData().then(() => {
      console.log(isValid);
      if (isValid === true) {
        console.log('redirect to landing');
        navigate('/landing');
      } else {
        console.log('redirect to error');
        navigate('/error');
      }
    });
  }, []);
  
  
  return <> ... </>;
}

