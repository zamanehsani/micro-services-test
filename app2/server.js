import express from "express";

import { setupRabbitMQ, consumeEvents } from "./index.js";

const app = express();
const queue = "events";

(async () => {
  const channel = await setupRabbitMQ();
  consumeEvents(channel, queue);

  app.listen(3002, () => console.log("App2 listening on port 3002"));
})();
