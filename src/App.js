import React from "react";
import "./App.css";
import TradeButtons from "./Components/TradeButtons";

const App = () => {
  return (
    <div className="app-container">
      <h2 className="app-title">GVT CopyTrading</h2>
      <div className="app-content">
        <TradeButtons symbol="BTCUSDT" />
        <TradeButtons symbol="SOLUSDT" />
        <TradeButtons symbol="ADAUSDT" />
        <TradeButtons symbol="NEARUSDT" />
        <TradeButtons symbol="ETHUSDT" />
        <TradeButtons symbol="ATOMUSDT" />
        <TradeButtons symbol="DOGEUSDT" />
      </div>
    </div>
  );
};

export default App;

// {"side":"Sell","symbol":"BTCUSDT","orderType":"Limit","qty":"0.001","price":"20000","takeProfit":"0","stopLoss":"0","tpTriggerBy":"LastPrice","slTriggerBy":"LastPrice"}'
