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
    "qty":"0.001"
  }`;

  const orderSide = side === "Buy" ? "LONG" : "SHORT";
  const info = `Opening ${orderSide} BTCUSDT`;

  const openOrderResponse = await http_request(endpoint, "POST", data, info);
  console.log(openOrderResponse);

  const getOrderResponse = await getOrder(openOrderResponse);
  console.log(getOrderResponse);

  const SlTpResponse = await setStopProfit(getOrderResponse);
  console.log(SlTpResponse);

  return [openOrderResponse, info];
};

export const getOrder = async ({ result }) => {
  const endpoint = "/contract/v3/private/copytrading/order/list";

  const data = `{
    "symbol": "${result.symbol}",
    "orderId": "${result.orderId}",
    "orderLinkId": "${result.orderLinkId}",
    "orderType": "Market"
  }`;

  const response = await http_request(endpoint, "GET", data, "Getting Orders");

  return response;
};

export const setStopProfit = async ({ result }) => {
  const endpoint = "/contract/v3/private/copytrading/order/trading-stop";

  const entryPrice = result.price;
  let takeProfit = 0;
  let stopLoss = 0;

  if (result.side === "Buy") {
    stopLoss = entryPrice * 0.97;
    takeProfit = entryPrice * 1.12;
  } else {
    stopLoss = entryPrice * 1.03;
    takeProfit = entryPrice * 0.88;
  }

  const data = `{
    "symbol": "${result.symbol}",
    "parentOrderId": "${result.orderId}",
    "parentOrderLinkId": "${result.orderLinkId}",
    "takeProfit": "${takeProfit}",
    "stopLoss": "${stopLoss}"
    "tpTriggerBy":"LastPrice",  
    "slTriggerBy":"LastPrice"
  }`;

  return await http_request(endpoint, "POST", data, "Setting SL & TP");
};
