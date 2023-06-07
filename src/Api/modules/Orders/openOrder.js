import cryptoJS from "crypto-js";
import { http_request } from "../../config";

export const openOrder = async (side, symbol, qty) => {
  const orderLinkId = cryptoJS.lib.WordArray.random(16).toString();

  const endpoint = "/contract/v3/private/copytrading/order/create";

  const data = JSON.stringify({
    side: side,
    symbol: symbol,
    orderType: "Market",
    orderLinkId: orderLinkId,
    qty: qty,
  });

  console.log(data);

  const orderSide = side === "Buy" ? "LONG" : "SHORT";
  const info = `Opening ${orderSide} ${symbol}`;

  const response = await http_request(endpoint, "POST", data, info);

  return response;
};
