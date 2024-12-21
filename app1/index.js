// const prisma = require("@prisma/client");
import prisma from "@prisma/client";
import amqp from "amqplib";

export const prismaClient = new prisma.PrismaClient();

export const publishEvent = async (channel, queue, message) => {
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(message));
  console.log(`Published by app1: ${message}`);
};

export const consumeEvents = async (channel, queue) => {
  await channel.assertQueue(queue);
  channel.consume(queue, async (msg) => {
    let message = msg.content.toString();
    // add consumed by app1 to the message
    message = `Consumed by app1: ${message}`;
    console.log(`Consumed by app1: ${message}`);
    await prismaClient.event.create({ data: { message } });
    channel.ack(msg);
  });
};

export const setupRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  return channel;
};
