import { useEffect, useState } from "react";

const cryptoJS = require("crypto-js");

export const BYBIT_SOCKET_URI = "wss://stream-testnet.bybit.com/v5/private";

const useBybitSocket = ({
  apiKey,
  apiSecret,
  subscriptions,
  onOpen,
  onMessage,
  onPing,
  onPong,
  onClose,
  onError,
}) => {
  const [clientInstance, setClientInstance] = useState(null);

  useEffect(() => {
    const client = new WebSocket(BYBIT_SOCKET_URI);

    const handleOpen = (event) => {
      console.log("open event!");
      console.log("WebSocket Client Connected");

      const expires = new Date().getTime() + 10000;

      const signature = cryptoJS
        .HmacSHA256("GET/realtime" + expires, apiSecret)
        .toString();

      const payload = {
        op: "auth",
        args: [apiKey, expires.toFixed(0), signature],
      };

      client.send(JSON.stringify(payload));

      setInterval(() => {
        client.send("ping");
        onPing && onPing();
      }, 30000);

      client.send(
        JSON.stringify({
          op: "subscribe",
          args: subscriptions ?? [],
        })
      );

      onOpen && onOpen(event);
    };

    client.addEventListener("open", handleOpen);
    client.addEventListener("message", onMessage);
    client.addEventListener("pong", onPong);
    client.addEventListener("close", onClose);
    client.addEventListener("error", onError);

    setClientInstance(client);

    return () => {
      client.removeEventListener("open", handleOpen);
      client.removeEventListener("message", onMessage);
      client.removeEventListener("pong", onPong);
      client.removeEventListener("close", onClose);
      client.removeEventListener("error", onError);
    };
  }, [apiKey, apiSecret]);

  return clientInstance;
};

export default useBybitSocket;
