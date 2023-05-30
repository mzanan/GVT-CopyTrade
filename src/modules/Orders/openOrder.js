const crypto = require("crypto");
const { http_request } = require("../../Api/config");

export const openOrder = async (side, symbol, qty) => {
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
  const info = `Opening ${orderSide} ${symbol}`;

  const response = await http_request(endpoint, "POST", data, info);

  return response;
};
