const crypto = require("crypto");
const axios = require("axios");

import {
  BASE_URL,
  API_KEY,
  API_SECRET,
  RECVWINDOW,
  TIMESTAMP,
} from "../constants/index";

const getSignature = (parameters) => {
  return crypto
    .createHmac("sha256", API_SECRET)
    .update(TIMESTAMP + API_KEY + RECVWINDOW + parameters)
    .digest("hex");
};

const buildUrl = (endpoint, method, data) => {
  const query = method === "POST" ? "" : `?${data}`;
  return `${BASE_URL}${endpoint}${query}`;
};

const http_request = async (endpoint, method, data, info) => {
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
    return {
      data: response.data,
      description: info,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  http_request,
};
