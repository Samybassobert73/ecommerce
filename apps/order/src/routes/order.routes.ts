import { Router } from 'express';
import orderController from '../controllers/order.controller';
const router = Router();

router.post('/', orderController.post);

export default router;
