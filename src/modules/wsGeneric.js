import { WebsocketClient } from "bybit-api";
import { wsConfig } from "./wsConfig";

export const wsGeneric = (onDataReceived) => {
  const ws = new WebsocketClient(wsConfig);

  ws.subscribe(["tickers. BTCUSDT"]); // tickers.BTCUSDT

  ws.on("update", (data) => {
    console.log(data.data.symbol, "markPrice: ", data.data.markPrice);
    return data.data.markPrice;
  });

  ws.on("open", ({ wsKey, event }) => {
    console.log("connection open for websocket with ID: " + wsKey);
  });

  ws.on("response", (response) => {
    console.log("response", response);
  });

  ws.on("close", () => {
    console.log("connection closed");
  });

  ws.on("error", (err) => {
    console.error("error", err);
  });
};
