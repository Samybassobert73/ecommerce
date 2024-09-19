import { Router } from 'express';
import cartController from '../controllers/cart.controller';
import cartLineItemRouter from './cartLineItem.routes';
const router = Router();

router.use('/:cartId/cartlineitem', cartLineItemRouter);
// router.get('/', cartController.findAll);
router.get('/:cartId', cartController.getById);
router.post('/', cartController.post);
// router.put('/:id', cartController.update);

// router.delete('/:id', productController.deleteProduct);

export default router;
