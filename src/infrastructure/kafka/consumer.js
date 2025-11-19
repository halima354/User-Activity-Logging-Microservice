import { Kafka } from 'kafkajs';
import * as DBService from '../../DB/DBservice.js';
import userModel from '../../DB/model/User.model.js';

if (!process.env.KAFKA_BROKER) {
  throw new Error("KAFKA_BROKER is not defined in .env file");
}

const kafka = new Kafka({ clientId: 'eyego-producer', brokers: [process.env.KAFKA_BROKER] })
const consumerInstance = kafka.consumer({ groupId: 'eyego-group' });

export async function startConsumer(){
  console.log('Connecting to Kafka')
  await consumerInstance.connect();
  console.log('Subscribed to topic')
  await consumerInstance.subscribe({ topic: 'user-activities', fromBeginning: true });
  await consumerInstance.run({
    eachMessage: async ({ message }) => {
      try {
        const payload = JSON.parse(message.value.toString());
        
        await DBService.create({ model: userModel, data: payload });
        console.log('Saved activity', payload);
      } catch (err) {
        console.error('Consumer error', err);
      }
    }
  });
  console.log('Kafka consumer started');
}

export { consumerInstance };




