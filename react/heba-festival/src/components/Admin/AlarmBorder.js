import React from "react";

const alarmboxStyle = {
  position: "absolute",
  display: "flex",
  right: "0",
  borderTop: "1px solid #d9d9d9",
  borderBottom: "1px solid #d9d9d9",
  width: "32rem",
  height: "13vh",
  maginLeft: "80rem",
  marginTop: "7rem",
};

const AlarmBorder = () => {
  const numberOfDivs = 7; // You can change this number based on your requirement
  const divs = Array.from({ length: numberOfDivs }, (_, index) => (
    <div
      key={index}
      style={{ ...alarmboxStyle, marginTop: `${index * 13}vh` }}
    ></div>
  ));

  return <>{divs}</>;
};

export default AlarmBorder;
