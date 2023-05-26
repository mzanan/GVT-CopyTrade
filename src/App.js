import React from "react";
import "./App.css";
import TradeButtons from "./Components/TradeButtons";
import { getBalance } from "./modules/balance";

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
      <button className="app-button" onClick={() => getBalance()}>
        getBalance
      </button>
    </div>
  );
};

export default App;
