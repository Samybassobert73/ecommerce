import { Router } from 'express';
import cartLineItemController from '../controllers/cartLineItem.controller';
const router = Router({ mergeParams: true });

router.get('/', cartLineItemController.get);
// router.get('/:id', cartLineItemController.findProductById);
// router.post('/', cartLineItemController.post);
router.put('/:cartlineitemid', cartLineItemController.update);
// router.delete('/:id', productController.deleteProduct);

export default router;
