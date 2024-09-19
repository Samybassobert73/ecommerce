import { Router } from 'express';
import productController from '../controllers/product.controller';
const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.findProductById);
router.post('/', productController.postProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
