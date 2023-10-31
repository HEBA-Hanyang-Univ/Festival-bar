import React, { useState } from "react";
import PropTypes from "prop-types";
import "styles/Box.scss";

const Box = ({ number, className }) => {
  const [isChecked, setIsChecked] = useState(false);

  const boxStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    width: "10rem",
    height: "6.1rem",
    border: "0.05rem solid black",
    position: "relative",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    borderRadius: "10px",
    marginBottom: "1rem",
  };

  const numberStyle = {
    paddingTop: "1rem", // PascalCase 대신 camelCase를 사용합니다.
    paddingRight: "0.5rem",
    fontSize: "1.5rem",
    fontWeight: "900", // font-weight의 올바른 속성명은 'fontWeight'입니다.
  };
  return (
    <div className={className} style={boxStyle}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </label>
      <span style={numberStyle}>{number}</span>
    </div>
  );
};

Box.propTypes = {
  number: PropTypes.number.isRequired,
  className: PropTypes.string,
};

const BoxGrid = () => {
  const rows = 5;
  const cols = 6;

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

  const numbers = Array.from({ length: rows * cols }, (_, index) => index + 1);

  return (
    <div style={gridContainerStyle}>
      {numbers.map((number, index) => (
        <Box key={index} number={number} className={boxClassName} />
      ))}
    </div>
  );
};

export default BoxGrid;
