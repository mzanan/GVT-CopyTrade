import React from "react";
import "./App.css";
import { openOrder, cancelAll, listBTCUSDT } from "./modules/api";

const App = () => {
  return (
    <div className="app-container">
      <h2 className="app-title">GVT CopyTrading</h2>
      <div className="app-content">
        <div className="app-button-container">
          <button className="app-button" onClick={() => listBTCUSDT()}>
            BTCUSDT Open Orders
          </button>

          <button
            className="app-button app-button-long"
            onClick={() => openOrder("Buy", "BTCUSDT")}
          >
            Long BTCUSDT
          </button>

          <button
            className="app-button app-button-short"
            onClick={() => openOrder("Sell", "BTCUSDT")}
          >
            Short BTCUSDT
          </button>

          <button
            className="app-button app-button-cancel"
            onClick={() => cancelAll()}
          >
            Cancel All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

// {"side":"Sell","symbol":"BTCUSDT","orderType":"Limit","qty":"0.001","price":"20000","takeProfit":"0","stopLoss":"0","tpTriggerBy":"LastPrice","slTriggerBy":"LastPrice"}'
