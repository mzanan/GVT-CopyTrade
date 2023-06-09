import axios from "axios";
import cryptoJS from "crypto-js";

import { BASE_URL, API_KEY, API_SECRET } from "../config";

const RECVWINDOW = 5000;

const getSignature = ({ data, timestamp }) => {
  const hmac = cryptoJS.HmacSHA256(
    timestamp + API_KEY + RECVWINDOW + data,
    API_SECRET
  );
  return hmac.toString(cryptoJS.enc.Hex);
};

const buildUrl = (endpoint, method, data) => {
  const query = method === "POST" ? "" : `?${data}`;
  return `${BASE_URL}${endpoint}${query}`;
};

const http_request = async (endpoint, method, data, info) => {
  const timestamp = Date.now().toString();

  const sign = getSignature({data, timestamp});
  const url = buildUrl(endpoint, method, data);

  const config = {
    method: method,
    url: url,
    headers: {
      "X-BAPI-SIGN-TYPE": "2",
      "X-BAPI-SIGN": sign,
      "X-BAPI-API-KEY": API_KEY,
      "X-BAPI-TIMESTAMP": timestamp,
      "X-BAPI-RECV-WINDOW": RECVWINDOW,
      "Content-Type": "application/json charset=utf-8",
    },
    data: method === "POST" ? data : undefined,
  };

  console.log(info);

  try {
    const response = await axios(config);
    return {
      data: response.data.result,
      description: info,
      status: response.data.retMsg,
    };
  } catch (error) {
    console.log(error);
  }
};

export { http_request };
