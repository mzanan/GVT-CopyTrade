const crypto = require("crypto");
const axios = require("axios");

const BASE_URL = "https://api-testnet.bybit.com";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_SECRET = process.env.REACT_APP_PRIVATE_KEY;
const RECVWINDOW = 100000;
const TIMESTAMP = Date.now().toString();

function getSignature(parameters, API_SECRET) {
  return crypto
    .createHmac("sha256", API_SECRET)
    .update(TIMESTAMP + API_KEY + RECVWINDOW + parameters)
    .digest("hex");
}

async function http_request(endpoint, method, data, Info) {
  const sign = getSignature(data, API_SECRET);
  let fullendpoint = "";
  if (method === "POST") {
    fullendpoint = BASE_URL + endpoint;
  } else {
    fullendpoint = BASE_URL + endpoint + "?" + data;
    data = "";
  }

  const config = {
    method: method,
    url: fullendpoint,
    headers: {
      "X-BAPI-SIGN-TYPE": "2",
      "X-BAPI-SIGN": sign,
      "X-BAPI-API-KEY": API_KEY,
      "X-BAPI-TIMESTAMP": TIMESTAMP,
      "X-BAPI-RECV-WINDOW": RECVWINDOW,
      "Content-Type": "application/json charset=utf-8",
    },
    data: data,
  };

  console.log(Info);
  await axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function listBTCUSDT() {
  const orderLinkId = crypto.randomBytes(16).toString("hex");

  const endpoint = "/contract/v3/private/copytrading/order/list";

  const data = "symbol=BTCUSDT&orderStatus=New&orderLinkId=" + orderLinkId;

  return await http_request(endpoint, "GET", data, "List Open Trades");
}

export async function openOrder() {
  const orderLinkId = crypto.randomBytes(16).toString("hex");

  const endpoint = "/contract/v3/private/copytrading/order/create";

  const data = `{
    "side":"Sell",
    "symbol":"BTCUSDT",
    "orderType":"Market",
    "orderLinkId": "${orderLinkId}",
    "qty":"0.001",
    "takeProfit":"0",
    "stopLoss":"0",
    "tpTriggerBy":"LastPrice",
    "slTriggerBy":"LastPrice"
  }`;

  return await http_request(endpoint, "POST", data, "Opening SHORT BTCUSDT");
}

export async function cancelAll() {
  const orderLinkId = crypto.randomBytes(16).toString("hex");

  const endpoint = "/contract/v3/private/copytrading/order/cancel";

  const data = '{"orderId":"' + orderLinkId + '"}';

  return await http_request(
    endpoint,
    "POST",
    data,
    "Cancelling ALL open orders"
  );
}
