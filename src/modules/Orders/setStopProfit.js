const { http_request } = require("../../Api/config");

export const setStopProfit = async (createOrder, listOrder) => {
  const positionData = listOrder.data.list[0];
  if (!positionData) {
    return {
      description: "Setting SL & TP",
      status: "No open order received.",
    };
  }

  const endpoint = "/contract/v3/private/copytrading/order/trading-stop";

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

  const response = await http_request(
    endpoint,
    "POST",
    data,
    "Setting SL & TP"
  );

  return response;
};
