import React, { Fragment } from "react";
import SymbolButtons from "./SymbolButtons/SymbolButtons";

const TradeCards = ({ tenPercent }) => {
  const symbols = [
    "BTCUSDT",
    "SOLUSDT",
    "ADAUSDT",
    "NEARUSDT",
    "ETHUSDT",
    "ATOMUSDT",
    "DOGEUSDT",
  ];

  return (
    <Fragment>
      {symbols.map((symbol) => (
        <SymbolButtons key={symbol} symbol={symbol} tenPercent={tenPercent} />
      ))}
    </Fragment>
  );
};

export default TradeCards;
