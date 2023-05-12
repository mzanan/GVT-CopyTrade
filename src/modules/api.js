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

  const orderSide = side === "Buy" ? "LONG" : "SHORT";
  const info = `Opening ${orderSide} BTCUSDT`;

  const response = await http_request(endpoint, "POST", data, info);

  console.log(response);

  return [response, info];
};

export const getOrder = async (symbol, responseData) => {
  const orderLinkId = crypto.randomBytes(16).toString("hex");

  const endpoint = "/contract/v3/private/copytrading/order/list";

  const orderId = responseData.result.orderId;

  const data = `{
    "symbol": "${symbol}",
    "orderId": "${orderId}",
    "orderLinkId": "${orderLinkId}",
    "copyTradeOrderType": "Market"
  }`;

  return await http_request(endpoint, "GET", data, "Getting Orders");
};
