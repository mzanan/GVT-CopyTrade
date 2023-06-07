import React, { useState } from "react";
import "./App.css";

import TradeCards from "./Components/TradeCards";
import Button from "./Components/Button/Button";
import { tenPercentBalance } from "./utils/setQuantity";

const App = () => {
  const [tenPercent, setTenPercent] = useState(null);

  const handleBalance = async () => {
    const tenPercentValue = await tenPercentBalance();
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
