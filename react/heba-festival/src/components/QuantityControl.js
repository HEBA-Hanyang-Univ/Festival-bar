import React from "react";

const QuantityControl = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="inputGroup">
      <button type="button" className="btnMinus" onClick={onDecrement}>
        -
      </button>
      <input
        type="number"
        step={"1"}
        max={"15"}
        value={quantity}
        name="quantity"
        className="quantityField"
      />
      <button type="button" className="btnPlus" onClick={onIncrement}>
        +
      </button>
    </div>
  );
};

export default QuantityControl;
