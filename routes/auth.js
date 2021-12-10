import express from 'express';
import { login } from '../controllers/auth';

const router = express.Router();

router.get('/login', login);

module.exports = router;
