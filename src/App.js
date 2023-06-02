import React, { useState } from "react";
import "./App.css";

import TradeCards from "./Components/TradeCards";
import Button from "./Components/Button/Button";
import { tenPercentBalance } from "./modules/Balance/setQuantity";

const App = () => {
  const [tenPercent, setTenPercent] = useState(null);

  const handleBalance = async () => {
    const tenPercent = await tenPercentBalance();
    console.log({ tenPercent });
    setTenPercent(tenPercent);
  };

  return (
    <div className="app-container">
      <h2 className="app-title">GVT CopyTrading</h2>

      <div className="button-container">
        <Button
          label="Get Wallet Balance"
          className="free-width"
          action={() => {
            handleBalance();
          }}
        />
      </div>

      <div className="app-content">
        <TradeCards tenPercent={tenPercent} />
      </div>
    </div>
  );
};

export default App;
