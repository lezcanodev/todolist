import validator from 'validator';

const task = {};

task.create = async (req, res, next) => {
	const { title, objectives } = req.body;
	const { isEmpty } = validator;
	const errors = [];
	
	if( typeof title === 'undefined' || isEmpty(title) ){
		errors.push({ title: 'Title is invalid' });
	}

	if(typeof objectives !== 'undefined' && !(objectives instanceof Array)){
		errors.push({ objectives: 'Objective is invalid' });
	}	

	if(errors.length > 0) {
		res.status(400).json({errors});
		return;
	}

	next();
}

export default task;