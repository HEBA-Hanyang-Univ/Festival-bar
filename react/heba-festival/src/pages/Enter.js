import React,{ useEffect } from "react";
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
      if (!(response.result === 'fail')) {
	// token is valid, but need additional auth
        secureLocalStorage.setItem("token", token);
	secureLocalStorage.setItem("table_no", response.result.table_no);
	const startTime = secureLocalStorage.getItem("start_time");
	if (startTime == null) {
	  // in this case, a user enter our system first time.
	  // but there is a posibility that he/she is a abnormal user(delete cache, or delayed enterance after limited time)
	  secureLocalStorage.setItem("start_time", response.result.start_time);
	  isValid = true;
	} else {
	  // compare response start_time and local-saved start_time to validate enterance
	  if (startTime === response.result.start_time) {
	    isValid = true;
	  } else {
	    isValid = false;
	  }
	}
      }
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    fetchData().then(() => {
      console.log(isValid);
      if (isValid === true) {
        navigate('/landing');
      } else {
        navigate('/error');
      }
    });
  }, []);
  
  
  return <> ... </>;
}

