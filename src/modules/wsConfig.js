export const wsConfig = {
  key: process.env.API_KEY,
  secret: process.env.PRIVATE_KEY,

  testnet: true,
  market: "linear",
  pongTimeout: 1000,
  pingInterval: 10000,
  reconnectTimeout: 500,
  wsUrl: "wss://stream-testnet.bybit.com/v5/public/linear",
  /* wsUrl: "wss://stream-testnet.bybit.com/realtime_private", */
};
