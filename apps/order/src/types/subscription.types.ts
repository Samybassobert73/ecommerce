export enum OrderEvents {
  CREATE_ORDER = 'create_order',
  CANCEL_ORDER = 'cancel_order',
}

export type Topic_Type = 'orderEvents' | 'catalogueEvents';

export interface MessageType {
  headers?: Record<string, any>;
  event: OrderEvents;
  data: Record<string, any>;
}
