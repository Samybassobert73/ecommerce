import { plainToClass } from 'class-transformer';
import CartLineItemDTO from '../dtos/cartLineItem.dto';
import cartService from '../services/cart.service';
import { validate } from 'class-validator';
import { messageBroker } from '../utils/broker/message-broker';
import { OrderEvents } from '../types';
export const post = async (req, res, next) => {
  //order create logic

  //publish message
  await messageBroker.publish({
    header: { token: 'tokensamy' },
    topic: 'orderEvents',
    event: OrderEvents.CREATE_ORDER,
    message: {
      orderId: '1',
      items: [
        {
          productId: '1',
          quantity: 1,
        },
        {
          productId: '2',
          quantity: 2,
        },
      ],
    },
  });
  res.status(200).send({ message: 'Order created' });
};

export default {
  post,
};
