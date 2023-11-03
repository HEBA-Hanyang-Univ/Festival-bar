//테이블 선택시 실행되는 부분 (배경 회색이었다가 박스 선택하는 부분)

import React, { useState } from "react";

const BoxSelect = ({ boxesPerRow, totalRows, boxData, onBoxClick }) => {
  const [manyBoxSelect, setManyBoxSelect] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const toggleManyBoxSelect = () => {
    setManyBoxSelect(!manyBoxSelect);
    setSelectedBoxes([]);
  };

  const handleBoxClick = (number) => {
    if (manyBoxSelect) {
      if (selectedBoxes.includes(number)) {
        setSelectedBoxes(
          selectedBoxes.filter((boxNumber) => boxNumber !== number)
        );
      } else {
        setSelectedBoxes([...selectedBoxes, number]);
      }
    }
  };

  const gridContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    width: "70%",
    height: "40vh",
    justifyContent: "space-between",
    alignItems: "space-between",
  };

  const boxClassName = "box";

  const numbers = Array.from(
    { length: totalRows * boxesPerRow },
    (_, index) => index + 1
  );

  const AdminBox = ({ number, isGreyed, onClick }) => {
    const boxStyle = {
      position: "absolute",
      width: "20.5rem",
      height: "14rem",
      border: "1px solid black",
      padding: "0.5rem",
      borderRadius: "10%",
      margin: "1rem",
      backgroundColor: isGreyed ? "lightgrey" : "white",
    };

    return (
      <div
        className={boxClassName}
        style={boxStyle}
        onClick={() => onClick(number)}
      >
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isGreyed}
            onChange={() => onClick(number)}
          />
        </label>
        <span>{number}</span>
      </div>
    );
  };

  return (
    <div>
      <button onClick={toggleManyBoxSelect}>
        {manyBoxSelect ? "많은 상자 선택 해제" : "많은 상자 선택 활성화"}
      </button>
      <div style={gridContainerStyle}>
        {numbers.map((number, index) => (
          <AdminBox
            key={index}
            number={number}
            isGreyed={manyBoxSelect && !selectedBoxes.includes(number)}
            onClick={handleBoxClick}
          />
        ))}
      </div>
    </div>
  );
};

export default BoxSelect;
