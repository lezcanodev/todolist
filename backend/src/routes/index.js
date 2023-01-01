import express from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import taskRouter from './task.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/task', taskRouter);

export default router;