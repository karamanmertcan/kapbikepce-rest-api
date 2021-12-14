import express from 'express';
import { createRestaurant, getRestaurants, getRestaurant } from '../controllers/restaurant';
import { requireSignin } from '../middlewares/auth';

const router = express.Router();

router.post('/create-restaurant', requireSignin, createRestaurant);
router.get('/get-restaurants', requireSignin, getRestaurants);
router.get('/get-restaurant/:id', requireSignin, getRestaurant);

module.exports = router;
