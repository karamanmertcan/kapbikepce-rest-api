import express from 'express';
import { login, register, userUpdate, getUser } from '../controllers/auth';
import { requireSignin } from '../middlewares/auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/get-user', requireSignin, getUser);
router.put('/user-update', requireSignin, userUpdate);

module.exports = router;
