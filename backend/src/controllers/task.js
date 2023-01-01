import { User, Task } from '../models/index.js';


const TASKS_PER_PAGE = 20;

const getAllTasks = async (req, res,  next) => {
	try{
		const { id: userId } = req.user;
		const { query, 
			completed, 
			oderObjs, 
			orderDate,
			pageQuery } = req.query;
		const criterias = {};
		const sort = {};
		sort['startedAt'] = 'desc';
		const page = pageQuery ? Number(pageQuery) :  1;

		if(typeof query !== 'undefined'){
			criterias['title'] = { $regex : query };
		}
		if(typeof completed !== 'undefined' && (completed === 'true' ||
		   completed === 'false') ){
			criterias['completed'] = completed === 'true';
		}
		if(typeof orderDate  !== 'undefined' && orderDate  === 'ASC' ||
		   orderDate  === 'DESC'){
			sort['startedAt'] = orderDate.toLowerCase();
		}

		const tasks = await Task.find(	{user: userId, ...criterias }, 
						{}, 
						{limit:TASKS_PER_PAGE, 
						 skip:(page-1)*TASKS_PER_PAGE})
					.sort(sort);
		
		if(typeof oderObjs !== 'undefined' && oderObjs === 'ASC' ||
		   oderObjs === 'DESC'){
			const val1 = oderObjs === 'DESC' ? 1 : -1;
			const val2 = oderObjs === 'DESC' ? -1 : 1;

			tasks.sort(({objectives: objs1}, {objectives: objs2}) =>{ 
				return objs1.length < objs2.length ? val1 : val2;
			});
		}

		let nextPage = {}; 
		if(tasks.length > 0){
			nextPage['page'] = page + 1;
			nextPage['exist'] = true;
		}else{
			nextPage['page'] = page - 1;
			nextPage['exist'] = false;
		}		
		
		res.status(200).json({tasks: tasks, nextPage: nextPage });

	}catch(error){
		next(error);
	}
}

const getTask = async (req, res,  next) => {
	try{
		const { id: userId } = req.user;
		const { taskId } = req.params;
		const task = await Task.findOne({user:userId, taskId});
		
		res.status(200).json(task);
	}catch(error){
		next(error);
	}
}

const createTask = async (req, res, next) => {
	try{
		const { id: userId } = req.user;
		const user = await User.findOne({_id:userId});

		const task = new Task();
		task.user = user._id;
		task.title = req.body.title;
		req.body.objectives?.forEach(objective => {
			if(objective.trim().length > 0){
				task.objectives.push({objective});
			}
		});
		
		await task.save();

		user.tasks.push(task._id);
		const result = await user.save();

		res.status(201).json({ msg: 'created', task: task });
	}catch(error){
		next(error);
	}
}

const editTask = async (req, res, next) => {
	try{
		const { id: userId } = req.user;
		const { taskId, title, objectives } = req.body;

		const task = await Task.findOne({ _id: taskId, user: userId  });
		task.title = title;

		const updateObjectives = [];

		objectives?.forEach(objective => {
			if(objective.trim().length > 0){
				updateObjectives.push({objective});
			}
		});

		task.objectives = updateObjectives;

		await task.save();

		res.status(201).json({ msg: 'edited', task: task });
	}catch(error){
		next(error);
	}
}

const deleteTask = async (req, res, next) => {
	try{
		const { taskId } = req.body;
		const { id : userId } = req.user;
	
		const result = await Task.deleteOne({ _id: taskId, user: userId  });

		if(result.deletedCount === 1){
			res.status(200).json({ msg: 'deleted' });
		}else{
			res.status(404).json({ msg: 'deleted error' });
		}	

	}catch(error){
		next(error);
	}

}

const completeTask = async (req, res, next) => {
	try{
		const { id: userId } = req.user; 
		const { taskId } = req.params;

		const task = await Task.findOne({ _id: taskId, user: userId  });	
		task.completed = !task.completed;
		task.finishedAt = Date.now();

		await task.save();

		res.status(200).json({msg:'completed', completed:task.completed});
	}catch(error){
		next(error);
	}
}

const completeObjective = async (req, res, next) => {
	try{
		const { id: userId } = req.user; 
		const { taskId, objectiveId } = req.params;

		const task = await Task.findOne({ _id: taskId, user: userId  });
		let result = false;	
		task.objectives = task.objectives.map(obj => {
			if(obj._id.toString() === objectiveId){
				
				result = obj.completed = !obj.completed;
			}
			return obj;
		});

		await task.save();

		res.status(200).json({msg:'completed', completed: result});
	}catch(error){
		next(error);
	}
}


export {
	getAllTasks,
	createTask,
	deleteTask,
	editTask,
	completeTask,
	getTask,
	completeObjective
}