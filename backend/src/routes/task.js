import express from 'express';
import { isAuth } from '../guards/auth.js';
import  validator from '../validators/index.js';
import {
	getTask,
	getAllTasks,
	createTask,
	deleteTask,
	editTask,
	completeTask,
	completeObjective
} from '../controllers/task.js';

const router = express.Router();

router.use(isAuth);



router.get('/', getAllTasks);
router.get('/:taskId/complete-objective/:objectiveId', completeObjective);
router.get('/:taskId', getTask);
router.get('/complete/:taskId', completeTask);
router.get('/complete/:taskId', completeTask);
router.post('/', validator.task.create , createTask);
router.delete('/', deleteTask);
router.put('/', editTask);


export default router;