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

  const createOrder = await http_request(endpoint, "POST", data, info);
  console.log(createOrder);

  const listOrders = await getOrder(symbol);
  console.log(listOrders);

  const SlTpResponse = await setStopProfit(createOrder, listOrders);
  console.log(SlTpResponse);

  return [createOrder, info];
};

export const getOrder = async (symbol) => {
  const endpoint = "/contract/v3/private/copytrading/position/list";

  const data = `symbol=${symbol}`;

  const response = await http_request(endpoint, "GET", data, "Getting Orders");

  return response;
};

export const setStopProfit = async (
  { result: createOrder },
  { result: listOrder }
) => {
  const endpoint = "/contract/v3/private/copytrading/order/trading-stop";

  const positionData = listOrder.list[0];
  const entryPrice = positionData.entryPrice;

  let takeProfit = 0;
  let stopLoss = 0;

  if (positionData.side === "Buy") {
    stopLoss = entryPrice * 0.97;
    takeProfit = entryPrice * 1.12;
  } else {
    stopLoss = entryPrice * 1.03;
    takeProfit = entryPrice * 0.88;
  }

  const data = `{
    "symbol": "${positionData.symbol}",
    "parentOrderId": "${createOrder.orderId}",
    "takeProfit": "${takeProfit.toFixed(2)}",
    "stopLoss": "${stopLoss.toFixed(2)}",
    "tpTriggerBy":"LastPrice",  
    "slTriggerBy":"LastPrice",
    "parentOrderLinkId": "${createOrder.orderLinkId}"
  }`;

  return await http_request(endpoint, "POST", data, "Setting SL & TP");
};
