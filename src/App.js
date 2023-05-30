import React from "react";
import "./App.css";

import TradeCards from "./Components/TradeCards";

const App = () => {
  return (
    <div className="app-container">
      <h2 className="app-title">GVT CopyTrading</h2>

      <div className="app-content">
        <TradeCards />
      </div>
    </div>
  );
};

export default App;
