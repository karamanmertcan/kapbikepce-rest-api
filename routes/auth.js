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
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');

const queryUserSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(64).required(),
  address: Joi.string().min(15).required(),
  phoneNumber: Joi.string()
    .min(10)
    .max(14)
    .regex(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .required()
});

const router = express.Router();

router.post('/login', login);
router.post('/register', validator.body(queryUserSchema), register);
router.post('/register-restaurant', registerRestaurant);
router.post('/login-restaurant', restaurantLogin);

router.get('/get-user', requireSignin, getUser);
router.get('/get-restaurant-user', requireSignin, getRestaurantUser);

router.put('/user-update', requireSignin, userUpdate);
router.put('/restaurant-user-update', requireSignin, restaurantUserUpdate);

module.exports = router;
