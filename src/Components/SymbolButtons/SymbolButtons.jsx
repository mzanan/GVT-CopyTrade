import React from "react";
import "./symbolButtons.css";
import {
  Button,
  ToastContainer,
  handleOpenOrder,
  handleCanelOrder,
} from "./index";

const SymbolButtons = ({ symbol, tenPercent }) => {
  let sidePosition = "";

  const openTrade = (side) => {
    handleOpenOrder(side, symbol, tenPercent);
    sidePosition = side;
  };

  const closeTrade = (symbol) => {
    handleCanelOrder(sidePosition, symbol);
  };

  return (
    <div className="app-button-container">
      <p className="app-button-title"> {symbol} </p>

      <Button
        className="app-button-long"
        label="Long"
        action={() => openTrade("Buy")}
      />

      <Button
        className="app-button-short"
        action={() => openTrade("Sell")}
        label="SHORT"
      />

      <Button
        className="app-button-cancel"
        action={() => closeTrade(symbol)}
        label="Cancel"
      />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SymbolButtons;
