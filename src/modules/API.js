const axios = require("axios");
const crypto = require("crypto");

const BASE_URL = "https://api-testnet.bybit.com";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_SECRET = process.env.REACT_APP_PRIVATE_KEY;
const RECVWINDOW = 20000;
const TIMESTAMP = Date.now().toString();

const side = "Buy";
const symbol = "BTCUSDT";
const orderType = "Market";
const qty = "0.00010";

const getSignature = (parameters) => {
  const message = TIMESTAMP + API_KEY + RECVWINDOW + parameters;
  const sign = crypto
    .createHmac("sha256", API_SECRET)
    .update(message)
    .digest("hex");
  return sign;
};

const buildConfig = (method, endpoint, data, sign) => {
  const config = {
    method: method,
    url: BASE_URL + endpoint,
    headers: {
      "X-BAPI-SIGN-TYPE": "2",
      "X-BAPI-SIGN": sign,
      "X-BAPI-API-KEY": API_KEY,
      "X-BAPI-TIMESTAMP": TIMESTAMP,
      "X-BAPI-RECV-WINDOW": RECVWINDOW.toString(),
      "Content-Type": "application/json; charset=utf-8",
    },
    data: data,
  };
  return config;
};

const http_request = async (endpoint, method, data, logMessage) => {
  const sign = getSignature(data);
  console.log("data ", data);
  const config = buildConfig(method, endpoint, data, sign);
  console.log(logMessage + " Calling....");
  try {
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const openOrder = async () => {
  console.log("Opening Long");
  const orderLinkId = crypto.randomBytes(16).toString("hex");
  const endpoint = "/contract/v3/private/copytrading/order/create";
  const data = {
    side,
    symbol,
    orderType,
    qty,
    orderLinkId,
  };
  const result = await http_request(endpoint, "POST", data, "CopyTrade(V3)");
  return result;
};
