import React from "react";

import Button from "../Button/Button";
import "./symbolButtons.css";

import { executeOrder } from "../../modules/Orders/executeOrder";
import { cancelOrder } from "../../modules/Orders/cancelOrder";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SymbolButtons = ({ symbol }) => {
  const handleOpenOrder = async (side, symbol) => {
    try {
      const response = await executeOrder(side, symbol);

      console.log("executeOrder response ", response);

      response.forEach((message) => {
        toast(`${message.description}: ${message.status}`);
      });
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className="app-button-container">
      <p className="app-button-title"> {symbol} </p>

      <Button
        className="app-button-long"
        label="Long"
        action={() => handleOpenOrder("Buy")}
      />

      <Button
        className="app-button-short"
        action={() => handleOpenOrder("Sell", symbol)}
        label="SHORT"
      />

      <Button
        className="app-button-cancel"
        action={() => cancelOrder(symbol)}
        label="Cancel"
      />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SymbolButtons;
