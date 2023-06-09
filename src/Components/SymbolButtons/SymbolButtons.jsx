import React, { useState } from "react";
import "./symbolButtons.css";
import { Button, ToastContainer } from ".";
import useSymbolButtons from "./useSymbolButtons";
import usePublicBybitSocket from "../../api/webSocket/usePublicBybitSocket";
import numeral from "numeral";

const SymbolButtons = ({ symbol, tenPercent }) => {
  const [price, setPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const presenter = useSymbolButtons({ symbol, tenPercent });

  usePublicBybitSocket({
    onOpen: console.log,
    onMessage: (event) => {
      const response = JSON.parse(event.data);
      if (!response.data) {
        setIsLoading(false);
        console.log("LOADING...");
      }

      if (
        response.data !== undefined &&
        response.data.lastPrice !== undefined
      ) {
        setPrice(response.data.lastPrice);
      }
    },
    subscriptions: [`tickers.${symbol}`],
  });

  return (
    <div className="app-button-container">
      <p
        className="app-button-title"
        style={{ color: isLoading ? "red" : "green" }}
      >
        {isLoading ? "⛔" : "✔️"}
      </p>
      <p className="app-button-title"> {symbol} </p>
      <p className="app-button-title" style={{ color: "yellow" }}>
        {numeral(price).format("$0,0.00")}
      </p>

      <Button
        className="app-button-long"
        label="Long"
        onClick={presenter.onLong}
      />

      <Button
        className="app-button-short"
        onClick={presenter.onShort}
        label="SHORT"
      />

      <Button
        className="app-button-cancel"
        onClick={presenter.onCancel}
        label="Cancel"
      />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SymbolButtons;
