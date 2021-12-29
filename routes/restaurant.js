import express from 'express';
import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurant';
import { requireSignin, restrauntOwnerUpdateEdit, isUserAdmin } from '../middlewares/auth';

const router = express.Router();

router.post('/create-restaurant', requireSignin, createRestaurant);

router.get('/get-restaurants', requireSignin, getRestaurants);
router.get('/get-restaurant/:id', requireSignin, getRestaurant);

router.put('/update-restaurant', requireSignin, updateRestaurant);

//admin routes
router.delete('/delete-restaurant/:id', requireSignin, isUserAdmin, deleteRestaurant);

module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJhMWI5NWVhMGMyZjQ1Yzk4ODJlMzEiLCJpYXQiOjE2Mzk1ODY3MzQsImV4cCI6MTY0MDE5MTUzNH0.jPZxyzJwvfh2UePUodODqNVinyy-2s73KldoSx4LyFA
