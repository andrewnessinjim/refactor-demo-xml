const amqplib = require("amqplib");

let channel;
let queue = "petEnquiryRequestQueue";

async function initRabbitMQ() {
  const connection = await amqplib.connect("amqp://localhost");
  channel = await connection.createChannel();

  await channel.assertQueue(queue);

  console.log("RabbitMQ connection and channel initialized. 🐰");

  process.on("SIGINT", async () => {
    console.log("Closing RabbitMQ connection");
    await channel.close();
    await connection.close();
  });
}

async function send(petRequest) {
  channel.sendToQueue(queue, Buffer.from(petRequest));
}

module.exports = { initRabbitMQ, send };
