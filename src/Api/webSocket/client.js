const crypto = require("crypto");

const connectWebSocket = (endpoint, API_KEY, API_SECRET) => {
  const client = new WebSocket(endpoint);

  client.addEventListener("open", () => {
    console.log("open event!");
    console.log("WebSocket Client Connected");

    const expires = new Date().getTime() + 10000;

    const signature = crypto
      .createHmac("sha256", API_SECRET)
      .update("GET/realtime" + expires)
      .digest("hex");

    const payload = {
      op: "auth",
      args: [API_KEY, expires.toFixed(0), signature],
    };

    client.send(JSON.stringify(payload));

    setInterval(() => {
      client.send("ping");
    }, 30000);

    client.send(
      JSON.stringify({
        op: "subscribe",
        args: ["wallet"],
      })
    );
  });

  client.addEventListener("message", (event) => {
    console.log("message event!", JSON.parse(event.data));
  });

  client.addEventListener("pong", () => {
    console.log("pong received");
  });

  client.addEventListener("close", () => {
    console.log("WebSocket connection closed");
  });

  client.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });

  return client;
};

export default connectWebSocket;
