import express from 'express';
import { requireSignin } from '../middlewares/auth';
import Product from '../models/Product';
import { createProduct, getProduct, getSingleProduct, updateProduct } from '../controllers/product';

const router = express.Router();

router.get('/get-restaurant-products/:id', requireSignin, getProduct);
router.get('/get-single-product/:id', requireSignin, getSingleProduct);

router.post('/create-product', requireSignin, createProduct);

router.put('/update-product/:id', requireSignin, updateProduct);

module.exports = router;
