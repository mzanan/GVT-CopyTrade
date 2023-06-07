import connectWebSocket from "./client";

const endpoint = "wss://stream-testnet.bybit.com/v5/private";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_SECRET = process.env.REACT_APP_PRIVATE_KEY;

console.log("attempting to connect to WebSocket ", endpoint);
const client = connectWebSocket(endpoint, API_KEY, API_SECRET);

export { client };
