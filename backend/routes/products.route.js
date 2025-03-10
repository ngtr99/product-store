import express from 'express'; 
import { getProducts, createProducts, deleteProducts, updateProducts } from '../controllers/products.controller.js';

const router = express.Router();


router.post('', createProducts);
 
router.delete('/:id', deleteProducts);
 
router.get('', getProducts);
 
router.put('/:id', updateProducts);
 
export default router;


