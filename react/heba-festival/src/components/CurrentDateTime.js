import React, { useState, useEffect } from "react";

const CurrentDateTime = () => {
  let [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // 1초마다 현재 날짜와 시간을 업데이트합니다.
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // 컴포넌트가 언마운트되면 인터벌을 정리합니다.
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행됩니다.

  const formattedDateTime = currentDateTime.toLocaleString(); // 현재 날짜와 시간을 지역 시간 형식으로 포맷합니다.

  return <div>{formattedDateTime};</div>;
};

export default CurrentDateTime;
