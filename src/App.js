import React from "react";
import "./App.css";

import Button from "./Components/Button/Button";
import TradeCards from "./Components/TradeCards";

import { getBalance } from "./modules/balance";

const App = () => {
  return (
    <div className="app-container">
      <h2 className="app-title">GVT CopyTrading</h2>
      <Button
        className="app-button"
        action={() => getBalance()}
        label="getBalance"
      />

      <div className="app-content">
        <TradeCards />
      </div>
    </div>
  );
};

export default App;
