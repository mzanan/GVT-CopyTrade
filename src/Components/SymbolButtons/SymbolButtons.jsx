import React from "react";
import "./symbolButtons.css";
import { Button, ToastContainer, handleOpenOrder, handleCanelOrder } from ".";

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
        onClick={() => openTrade("Buy")}
      />

      <Button
        className="app-button-short"
        onClick={() => openTrade("Sell")}
        label="SHORT"
      />

      <Button
        className="app-button-cancel"
        onClick={() => closeTrade(symbol)}
        label="Cancel"
      />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SymbolButtons;
