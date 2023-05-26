import React from "react";

import { executeOrder } from "../modules/Orders/executeOrder";
import { cancelOrder } from "../modules/Orders/cancelOrder";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TradeButtons = ({ symbol }) => {
  const handleOpenOrder = async (side, symbol) => {
    try {
      const response = await executeOrder(side, symbol);

      console.log("front response data ", response);

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

      <button
        className="app-button app-button-long"
        onClick={() => handleOpenOrder("Buy", symbol)}
      >
        LONG
      </button>

      <button
        className="app-button app-button-short"
        onClick={() => handleOpenOrder("Sell", symbol)}
      >
        SHORT
      </button>

      <button
        className="app-button app-button-cancel"
        onClick={() => cancelOrder(symbol)}
      >
        Cancel
      </button>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default TradeButtons;
