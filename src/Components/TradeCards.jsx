import React, { Fragment } from "react";
import SymbolButtons from "./SymbolButtons/SymbolButtons";

const TradeCards = () => {
  return (
    <Fragment>
      <SymbolButtons symbol="BTCUSDT" />
      <SymbolButtons symbol="SOLUSDT" />
      <SymbolButtons symbol="ADAUSDT" />
      <SymbolButtons symbol="NEARUSDT" />
      <SymbolButtons symbol="ETHUSDT" />
      <SymbolButtons symbol="ATOMUSDT" />
      <SymbolButtons symbol="DOGEUSDT" />
    </Fragment>
  );
};

export default TradeCards;
