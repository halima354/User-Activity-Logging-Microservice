
import { Kafka } from "kafkajs";


if (!process.env.KAFKA_BROKER) {
  throw new Error("KAFKA_BROKER is not defined in .env file");
}

const kafka = new Kafka({ clientId: 'eyego-producer', brokers: [process.env.KAFKA_BROKER] });
const producerInstance = kafka.producer()

export const startProducer = async () => {
    await producerInstance.connect()
    console.log('Kafka producer connected')
}

export const sendActivity = async (activity) => {
    await producerInstance.send({
        topic: 'user-activities',
        messages: [{ key: activity.userId, value: JSON.stringify(activity) }]
    })
}
