import express from "express";
import { setupRabbitMQ, publishEvent, consumeEvents } from "./index.js";

const app = express();
app.use(express.json());

const queue = "events";

(async () => {
  const channel = await setupRabbitMQ();
  consumeEvents(channel, queue);

  app.post("/publish", async (req, res) => {
    const { message } = req.body;
    await publishEvent(channel, queue, message);
    res.json({ status: "Message published by app1" });
  });

  app.listen(3001, () => console.log("App1 listening on port 3001"));
})();
