import express from 'express';
import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant
} from '../controllers/restaurant';
import { requireSignin, restrauntOwnerUpdateEdit } from '../middlewares/auth';

const router = express.Router();

router.post('/create-restaurant', requireSignin, createRestaurant);

router.get('/get-restaurants', requireSignin, getRestaurants);
router.get('/get-restaurant/:id', requireSignin, getRestaurant);

// router.delete('/remove-restaurant/:id', requireSignin, removeRestaurant);

// router.put('/add-item', requireSignin, addRestaurantItem);
// router.put('/remove-item', requireSignin, removeRestaurantItem);
router.put('/update-restaurant', requireSignin, updateRestaurant);
// router.put('/update-item', requireSignin, updateRestaurantItem);

module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJhMWI5NWVhMGMyZjQ1Yzk4ODJlMzEiLCJpYXQiOjE2Mzk1ODY3MzQsImV4cCI6MTY0MDE5MTUzNH0.jPZxyzJwvfh2UePUodODqNVinyy-2s73KldoSx4LyFA
