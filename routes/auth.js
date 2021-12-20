import express from 'express';
import {
  login,
  register,
  userUpdate,
  getUser,
  registerRestaurant,
  restaurantLogin,
  restaurantUserUpdate,
  getRestaurantUser
} from '../controllers/auth';
import { requireSignin } from '../middlewares/auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/register-restaurant', registerRestaurant);
router.post('/login-restaurant', restaurantLogin);

router.get('/get-user', requireSignin, getUser);
router.get('/get-restaurant-user', requireSignin, getRestaurantUser);

router.put('/user-update', requireSignin, userUpdate);
router.put('/restaurant-user-update', requireSignin, restaurantUserUpdate);

module.exports = router;
