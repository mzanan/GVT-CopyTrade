const crypto = require("crypto");
const axios = require("axios");

const BASE_URL = "https://api-testnet.bybit.com";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_SECRET = process.env.REACT_APP_PRIVATE_KEY;
const RECVWINDOW = 100000;
const TIMESTAMP = Date.now().toString();

function getSignature(parameters) {
  return crypto
    .createHmac("sha256", API_SECRET)
    .update(TIMESTAMP + API_KEY + RECVWINDOW + parameters)
    .digest("hex");
}

function buildUrl(endpoint, method, data) {
  const query = method === "POST" ? "" : `?${data}`;
  return `${BASE_URL}${endpoint}${query}`;
}

async function http_request(endpoint, method, data, info) {
  const sign = getSignature(data);
  const url = buildUrl(endpoint, method, data);

  const config = {
    method: method,
    url: url,
    headers: {
      "X-BAPI-SIGN-TYPE": "2",
      "X-BAPI-SIGN": sign,
      "X-BAPI-API-KEY": API_KEY,
      "X-BAPI-TIMESTAMP": TIMESTAMP,
      "X-BAPI-RECV-WINDOW": RECVWINDOW,
      "Content-Type": "application/json charset=utf-8",
    },
    data: method === "POST" ? data : undefined,
  };

  console.log(info);

  try {
    const response = await axios(config);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  BASE_URL,
  API_KEY,
  RECVWINDOW,
  TIMESTAMP,
  getSignature,
  http_request,
};
