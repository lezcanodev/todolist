import express from 'express';
import  validator from '../validators/index.js';

import {
	signup,
	signin,
	verifyToken
} from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', validator.auth.signup, signup );
router.post('/signin', validator.auth.signin, signin );
router.get('/verify-token', verifyToken);

export default router;