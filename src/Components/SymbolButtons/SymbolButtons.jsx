import React from "react";
import "./symbolButtons.css";
import {
  Button,
  ToastContainer,
  handleOpenOrder,
  handleCanelOrder,
} from "./index";

const SymbolButtons = ({ symbol }) => {
  return (
    <div className="app-button-container">
      <p className="app-button-title"> {symbol} </p>

      <Button
        className="app-button-long"
        label="Long"
        action={() => handleOpenOrder("Buy", symbol)}
      />

      <Button
        className="app-button-short"
        action={() => handleOpenOrder("Sell", symbol)}
        label="SHORT"
      />

      <Button
        className="app-button-cancel"
        action={() => handleCanelOrder(symbol)}
        label="Cancel"
      />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SymbolButtons;
