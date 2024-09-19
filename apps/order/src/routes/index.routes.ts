import { Router } from 'express';
import cartRouter from './cart.routes';
import orderRouter from './order.routes';
const router = Router();

router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
export default router;
