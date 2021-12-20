import express from 'express';
import { createOrder, getOrderByRestaurantId, getUserOrderById } from '../controllers/order';
import { requireSignin } from '../middlewares/auth';

const router = express.Router();

router.post('/create-order', requireSignin, createOrder);

router.get('/get-restaurant-order/:id', getOrderByRestaurantId);
router.get('/get-user-order/:id', getUserOrderById);

module.exports = router;
