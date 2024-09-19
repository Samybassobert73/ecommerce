import { MessageType, OrderEvents, Topic_Type } from '../../types';

export interface PublishType {
  header: Record<string, any>;
  topic: Topic_Type;
  event: OrderEvents;
  message: Record<string, any>;
}

export type MessageHandler = (input: MessageType) => void;

export type MessageBrokerTypes = {
  connectProducer: <T>() => Promise<T>;
  disconnectProducer: () => Promise<void>;
  publish: (data: PublishType) => Promise<boolean>;

  //consumer
  connectConsumer: <T>() => Promise<T>;
  disconnectConsumer: () => Promise<void>;
  subscribe: <T>(
    messageHandler: MessageHandler,
    topic: string
  ) => Promise<void>;
};
