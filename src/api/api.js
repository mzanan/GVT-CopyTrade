import cryptoJS from "crypto-js";
import { http_request } from "./config";

class BybitApi {
  openOrder = async (side, symbol, qty) => {
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

  cancelPosition = async (side, symbol) => {
    const endpoint = "/contract/v3/private/copytrading/position/close";

    let positionIdx = 0;
    if (side === "Buy") {
      positionIdx = 1;
    } else if (side === "Sell") {
      positionIdx = 2;
    }
    //0-Single side; 1-Buy side of both side mode; 2-Sell side of both side mode

    console.log({ side, positionIdx });

    const data = JSON.stringify({
      symbol: symbol,
      positionIdx: positionIdx,
    });

    console.log(data);

    const response = await http_request(
      endpoint,
      "POST",
      data,
      "Canceling order"
    );

    console.log(response);

    return response;
  };

  listPositions = async (symbol) => {
    const endpoint = "/contract/v3/private/copytrading/position/list";

    const data = `symbol=${symbol}`;

    const response = await http_request(
      endpoint,
      "GET",
      data,
      "Getting Orders"
    );

    return response;
  };

  setStopProfit = async (createOrder, listOrder) => {
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

    const data = JSON.stringify({
      symbol: positionData.symbol,
      parentOrderId: createOrder.data.orderId,
      takeProfit: takeProfit.toFixed(2),
      stopLoss: stopLoss.toFixed(2),
      tpTriggerBy: "LastPrice",
      slTriggerBy: "LastPrice",
      parentOrderLinkId: createOrder.data.orderLinkId,
    });

    const response = await http_request(
      endpoint,
      "POST",
      data,
      "Setting SL & TP"
    );

    return response;
  };

  getBalance = async () => {
    const endpoint = "/contract/v3/private/copytrading/wallet/balance";

    const response = await http_request(
      endpoint,
      "GET",
      "",
      "Getting Balance..."
    );

    const balance = response.data.availableBalance;

    return balance;
  };

  getPrice = async (symbol) => {
    const endpoint = "/derivatives/v3/public/tickers";

    const data = `symbol=${symbol}`;

    const response = await http_request(
      endpoint,
      "GET",
      data,
      "Getting Symbol Price..."
    );

    const price = response.data.list[0].lastPrice;
    return price;
  };
}

const bybitApi = new BybitApi();

export default bybitApi;
