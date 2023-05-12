const BASE_URL = "https://api-testnet.bybit.com";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_SECRET = process.env.REACT_APP_PRIVATE_KEY;
const RECVWINDOW = 100000;
const TIMESTAMP = Date.now().toString();

module.exports = {
  BASE_URL,
  API_KEY,
  API_SECRET,
  RECVWINDOW,
  TIMESTAMP,
};
