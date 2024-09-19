import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index.routes';
import { connect } from './database/mongodb';
import { messageBroker } from './utils/broker/message-broker';
import { Consumer, Producer } from 'kafkajs';

const broker = async () => {
  const producer = await messageBroker.connectProducer<Producer>();
  producer.on(producer.events.CONNECT, async () => {
    console.log('producer connected');
  });

  const consumer = await messageBroker.connectConsumer<Consumer>();
  consumer.on(consumer.events.CONNECT, async () => {
    console.log('consumer connected');
  });

  await messageBroker.subscribe((message) => {
    console.log('message received', message);
  }, 'orderEvents');
  const app = express();
};

broker();
connect();

const app = express();

app.use(cors());
app.use(express.json());

app.use(indexRouter);
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

export default app;
