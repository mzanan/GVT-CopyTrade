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

  const listOrderResponse = await getOrder(symbol);
  console.log(listOrderResponse);

  const SlTpResponse = await setStopProfit(
    listOrderResponse,
    openOrderResponse
  );
  console.log(SlTpResponse);

  return [openOrderResponse, info];
};

export const getOrder = async (symbol) => {
  const endpoint = "/contract/v3/private/copytrading/position/list";

  const data = `symbol=${symbol}`;

  const response = await http_request(endpoint, "GET", data, "Getting Orders");

  return response;
};

export const setStopProfit = async (
  { result: listOrderResult },
  { result: openOrderResult }
) => {
  const positionList = listOrderResult.list[0];
  console.log("result ", positionList);

  const endpoint = "/contract/v3/private/copytrading/order/trading-stop";

  const entryPrice = positionList.entryPrice;
  let takeProfit = 0;
  let stopLoss = 0;

  if (positionList.side === "Buy") {
    stopLoss = entryPrice * 0.97;
    takeProfit = entryPrice * 1.12;
  } else {
    stopLoss = entryPrice * 1.03;
    takeProfit = entryPrice * 0.88;
  }

  const data = `{
    "symbol": "${positionList.symbol}",
    "parentOrderId": "${openOrderResult.orderId}",
    "takeProfit": "${takeProfit.toFixed(1)}",
    "stopLoss": "${stopLoss.toFixed(1)}"
    "tpTriggerBy":"LastPrice",  
    "slTriggerBy":"LastPrice",
    "parentOrderLinkId": "${openOrderResult.orderLinkId}"
  }`;

  console.log("data ", data);

  return await http_request(endpoint, "POST", data, "Setting SL & TP");
};
