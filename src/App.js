import React from "react";
import { openOrder } from "./modules/API";

const App = () => {
  return (
    <div>
      <h2>Welcome to React</h2>

      <button onClick={() => openOrder()}>Long BTCUSDT</button>
    </div>
  );
};

export default App;

// {"side":"Sell","symbol":"BTCUSDT","orderType":"Limit","qty":"0.001","price":"20000","takeProfit":"0","stopLoss":"0","tpTriggerBy":"LastPrice","slTriggerBy":"LastPrice"}'
