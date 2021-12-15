import express from 'express';
import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  addRestaurantItem,
  removeRestaurantItem,
  updateRestaurantItem
} from '../controllers/restaurant';
import { requireSignin } from '../middlewares/auth';

const router = express.Router();

router.post('/create-restaurant', requireSignin, createRestaurant);

router.get('/get-restaurants', requireSignin, getRestaurants);
router.get('/get-restaurant/:id', requireSignin, getRestaurant);

router.put('/add-item', requireSignin, addRestaurantItem);
router.put('/remove-item', requireSignin, removeRestaurantItem);
router.put('/update-item', requireSignin, updateRestaurantItem);

module.exports = router;
