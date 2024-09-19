import { Consumer, Kafka, logLevel, Partitioners, Producer } from 'kafkajs';
import {
  MessageBrokerTypes,
  MessageHandler,
  PublishType,
} from './broker.types';
import { MessageType, OrderEvents, Topic_Type } from '../../types';
//configurations
const CLIENT_ID = process.env.CLIENT_ID ?? 'order_service';
const GROUP_ID = process.env.GROUP_ID ?? 'order_service_group';
const BROKERS = [process.env.BROKERS ?? 'localhost:9092'];

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  logLevel: logLevel.INFO,
});

let producer: Producer;
let consumer: Consumer;

const createTopic = async (topic: string[]) => {
  const topics = topic.map((t) => ({
    topic: t,
    numOfPartitions: 2,
    replicationFactor: 1,
  }));
  const admin = kafka.admin();
  await admin.connect();
  const topicExists = await admin.listTopics();
  for (const t of topics) {
    if (!topicExists.includes(t.topic)) {
      await admin.createTopics({
        topics: [t],
      });
    }
  }
  await admin.disconnect();
};

const connectProducer = async <T>(): Promise<T> => {
  await createTopic(['orderEvents']);
  if (!producer) {
    producer = kafka.producer();
  }

  producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  await producer.connect();
  return producer as unknown as T;
};

const disconnectProducer = async (): Promise<void> => {
  if (producer) {
    await producer.disconnect();
  }
};

const publish = async (data: PublishType): Promise<boolean> => {
  const producer = await connectProducer<Producer>();
  const result = await producer.send({
    topic: data.topic,
    messages: [
      {
        value: JSON.stringify(data.message),
        headers: data.header,
        key: data.event,
      },
    ],
  });
  console.log('publishing result', result);
  return result.length > 0;
};

const connectConsumer = async <T>(): Promise<T> => {
  if (consumer) {
    return consumer as unknown as T;
  }

  consumer = kafka.consumer({
    groupId: GROUP_ID,
  });

  await consumer.connect();
  return consumer as unknown as T;
};

const disconnectConsumer = async (): Promise<void> => {
  if (consumer) {
    await consumer.disconnect();
  }
};

const subscribe = async <T>(
  messageHandler: MessageHandler,
  topic: Topic_Type
): Promise<void> => {
  const consumer = await connectConsumer<Consumer>();
  await consumer.subscribe({
    topic: topic,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic !== 'orderEvents') {
        return;
      }

      if (message.key && message.value) {
        const inputMessage: MessageType = {
          event: message.key.toString() as OrderEvents,
          headers: message.headers,
          data: message.value ? JSON.parse(message.value.toString()) : null,
        };

        await messageHandler(inputMessage);
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() },
        ]);
      }
    },
  });
};

export const messageBroker: MessageBrokerTypes = {
  connectProducer,
  disconnectProducer,
  publish,
  connectConsumer,
  disconnectConsumer,
  subscribe,
};
