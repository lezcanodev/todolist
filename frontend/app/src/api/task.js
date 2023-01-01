import { getToken } from '../helper/functions';
const URI = 'http://localhost:3001/api/task/';


const getTasks = async (query = '', filters = {}) => {
	const params = new URLSearchParams();
	params.append('token', getToken());

	if(query) params.append('query', query);
	
	for(let filter in filters){
		params.append(filter, filters[filter]);
	}	

	const response = await fetch(`${URI}?${params.toString()}`);
	const tasks = await response.json();
	return tasks;
}

const getTask = async (taskId) => {
	const response = await fetch(`${URI}${taskId}?token=${getToken()}`);
	const tasks = await response.json();
	return tasks;
}

const createTask = async ({title, objectives}) => {
	const response = await fetch(`${URI}?token=${getToken()}`, {
		method: 'POST',
		body: JSON.stringify({title, objectives: !objectives ? [] : objectives.split('\n')}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const result = await response.json();

	if(result?.errors){
		throw new Error('Error');
	}	

	return result;
}

const editTask = async ({taskId, title, objectives}) => {
	const response = await fetch(`${URI}?token=${getToken()}`, {
		method: 'PUT',
		body: JSON.stringify({taskId, title, objectives: !objectives ? [] : objectives.split('\n')}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const result = await response.json();
	
	return result;
}

const deleteTask = async (taskId) => {
	const response = await fetch(`${URI}?token=${getToken()}`, {
		method: 'DELETE',
		body: JSON.stringify({taskId}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const result = await response.text();

	return result;
}

const completedTask = async (taskId) => {
	const response = await fetch(`${URI}/complete/${taskId}?token=${getToken()}`);
	const result = await response.json();
	return result;
}

const completeObjective = async (taskId, objectiveId) => {
	const response = await fetch(`${URI}/${taskId}/complete-objective/${objectiveId}?token=${getToken()}`);
	const result = await response.json();
	return result;
}


export {
	getTask,
	getTasks,
	createTask,
	deleteTask,
	editTask,
	completedTask,
	completeObjective
}