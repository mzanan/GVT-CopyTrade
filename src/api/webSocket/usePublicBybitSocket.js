import { useEffect, useState } from "react";

const cryptoJS = require("crypto-js");

export const BYBIT_SOCKET_URI =
  "wss://stream-testnet.bybit.com/contract/usdt/public/v3";

const usePublicBybitSocket = ({
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
      console.log("WebSocket Public Client Connected");

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
  }, []);

  return clientInstance;
};

export default usePublicBybitSocket;
