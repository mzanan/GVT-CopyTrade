import React from "react";
import { openOrder, cancelAll } from "../modules/api";

const TradeButtons = ({ symbol }) => {
  return (
    <div className="app-button-container">
      <p className="app-button-title"> {symbol} </p>
      <button
        className="app-button app-button-long"
        onClick={() => openOrder("Buy", symbol)}
      >
        LONG
      </button>

      <button
        className="app-button app-button-short"
        onClick={() => openOrder("Sell", symbol)}
      >
        SHORT
      </button>

      <button
        className="app-button app-button-cancel"
        onClick={() => cancelAll()}
      >
        Cancel
      </button>
    </div>
  );
};

export default TradeButtons;
