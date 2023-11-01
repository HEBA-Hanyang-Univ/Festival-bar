import React,{ useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export const Enter = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const fetchData = async() => {
    try {
      let response = await fetch("http://150.230.252.177:5000/check-token", {
	mode:'cors',
        method:"POST",
        body:JSON.stringify({
          'token': token,
        }),
        headers: { "Content-Type": "application/json", },
      });
      response = await response.json();
      if (response.result === 'ok') {
	// token is valid, but need additional auth
        secureLocalStorage.setItem("token", token);
        return true;
      }
    } catch (error) {
      window.alert(error);
    }
    return false;
  };

  useEffect(() => {
    fetchData().then((ret) => {
      if (ret === true) {
        navigate('/landing');
      } else {
        navigate('/error');
      }
    });
  }, []);
  
  return <> ... </>;
}

