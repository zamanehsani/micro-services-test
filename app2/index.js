import prisma from "@prisma/client";
import amqp from "amqplib";

export const prismaClient = new prisma.PrismaClient();

export const consumeEvents = async (channel, queue) => {
  await channel.assertQueue(queue);
  channel.consume(queue, async (msg) => {
    let event = msg.content.toString();
    // add consumed by app2 to the event
    event = `Consumed by app2: ${event}`;
    console.log(`Consumed by app2: ${event}`);
    await prismaClient.log.create({ data: { event } });
    channel.ack(msg);
  });
};

export const setupRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  return channel;
};
