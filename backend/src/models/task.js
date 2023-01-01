import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
	title: { type: String, required: true },
	completed: { type: Boolean, required: true, default: false },
	startedAt: { type: Date, required: true,  default: Date.now},
	finishedAt: { type: Date, required: true,  default: Date.now},
	objectives: [{
		objective: { type: String, required: true },
		completed: { type: Boolean, required: true, default: false }
	}],
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'}	
});

const Task = mongoose.model('tasks', taskSchema);

export default Task;