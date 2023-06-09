import React, { useState } from "react";
import "./App.css";

import TradeCards from "./Components/TradeCards";
import Button from "./Components/Button/Button";
import balanceService from "./services/BalanceService";
import usePrivateBybitSocket from "./api/webSocket/usePrivateBybitSocket";
import { API_KEY, API_SECRET } from "./config";

const App = () => {
  usePrivateBybitSocket({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    onOpen: console.log,
    onMessage: console.log,
    subscriptions: [""],
  });

  const [tenPercent, setTenPercent] = useState(null);

  const handleBalance = async () => {
    const tenPercentValue = await balanceService.tenPercentBalance();
    console.log({ tenPercentValue });
    setTenPercent(tenPercentValue);
  };

  return (
    <div className="app-container">
      <h2 className="app-title">GVT CopyTrading</h2>

      <div className="button-container">
        <Button
          label="Get Wallet Balance"
          className="free-width"
          onClick={handleBalance}
        />
      </div>

      <div className="app-content">
        <TradeCards tenPercent={tenPercent} />
      </div>
    </div>
  );
};

export default App;
