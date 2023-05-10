const crypto = require("crypto");

const { http_request } = require("./config");

export const openOrder = async (side, symbol) => {
  const orderLinkId = crypto.randomBytes(16).toString("hex");

  const endpoint = "/contract/v3/private/copytrading/order/create";

  const data = `{
    "side": "${side}",
    "symbol": "${symbol}",
    "orderType":"Market",
    "orderLinkId": "${orderLinkId}",
    "qty":"0.001",
    "takeProfit":"0",
    "stopLoss":"0",
    "tpTriggerBy":"LastPrice",
    "slTriggerBy":"LastPrice"
  }`;

  console.log(data);

  const orderSide = side === "Buy" ? "LONG" : "SHORT";

  return await http_request(
    endpoint,
    "POST",
    data,
    `Opening ${orderSide} BTCUSDT`
  );
};

export const cancelAll = async () => {
  const orderLinkId = crypto.randomBytes(16).toString("hex");

  const endpoint = "/contract/v3/private/copytrading/order/cancel";

  const data = '{"orderId":"' + orderLinkId + '"}';

  return await http_request(
    endpoint,
    "POST",
    data,
    "Cancelling ALL open orders"
  );
};
