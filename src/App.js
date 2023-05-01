import React from "react";
import { openOrder, cancelAll, listBTCUSDT } from "./modules/API";

const App = () => {
  return (
    <div>
      <h2>GVT CopyTrading</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "200px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100px",
            height: "200px",
            justifyContent: "space-between",
          }}
        >
          <button onClick={() => listBTCUSDT()}>BTCUSDT Open Orders</button>

          <button
            onClick={() => openOrder("Buy")}
            style={{ backgroundColor: "green" }}
          >
            Long BTCUSDT
          </button>

          <button
            onClick={() => openOrder()}
            style={{ backgroundColor: "red" }}
          >
            Short BTCUSDT
          </button>

          <button onClick={() => cancelAll()}>Cancel All Orders</button>
        </div>
      </div>
    </div>
  );
};

export default App;

// {"side":"Sell","symbol":"BTCUSDT","orderType":"Limit","qty":"0.001","price":"20000","takeProfit":"0","stopLoss":"0","tpTriggerBy":"LastPrice","slTriggerBy":"LastPrice"}'
