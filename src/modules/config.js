const crypto = require("crypto");
const axios = require("axios");

import {
  BASE_URL,
  API_KEY,
  API_SECRET,
  RECVWINDOW,
  TIMESTAMP,
} from "../constants/index";

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
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  http_request,
};
