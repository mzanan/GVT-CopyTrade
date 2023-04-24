import React from "react";
import { RestClientV5 } from "bybit-api";
/* import { wsGeneric } from "./modules/wsGeneric"; */

const App = () => {
  /* const markPrice = wsGeneric(); */

  "https://api-testnet.bybit.com/contract/v3/private/copytrading/order/create";

  const client = new RestClientV5({
    key: process.env.API_KEY,
    secret: process.env.PRIVATE_KEY,
    testnet: true,
  });

  client
    .getAccountInfo()
    .then((result) => {
      console.log("getAccountInfo result: ", result);
    })
    .catch((err) => {
      console.error("getAccountInfo error: ", err);
    });

  client
    .getOrderbook({ category: "linear", symbol: "BTCUSD" })
    .then((result) => {
      console.log("getOrderBook result: ", result);
    })
    .catch((err) => {
      console.error("getOrderBook error: ", err);
    });

  return (
    <div className="App">
      <h2>Welcome to React</h2>
    </div>
  );
};

export default App;
