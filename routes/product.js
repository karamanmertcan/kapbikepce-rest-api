import express from 'express';
import { requireSignin } from '../middlewares/auth';
import Product from '../models/Product';
import { createProduct, getProduct } from '../controllers/product';

const router = express.Router();

router.get('/get-product/:id', requireSignin, getProduct);

router.post('/create-product', requireSignin, createProduct);

module.exports = router;
