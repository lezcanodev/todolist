import validator from 'validator';
import { User } from '../models/index.js';

const auth = {};

auth.signup = async (req, res, next) => {
	const { nick, password } = req.body;
	const { isDecimal, isInt, isLength, isEmpty } = validator;
	const errors = [];
	
	if(typeof nick === 'undefined' || isEmpty(nick) ||
	   isDecimal(nick) || isInt(nick) ){
		errors.push({nick: 'Nick is invalid ' });
	}else{
		const existNick = await User.existNick(nick);	
		if(existNick) errors.push({ nick: 'Nick has already been taken' })
	}

	if(typeof password === 'undefined' || !isLength(password, { min: 6})){
		errors.push({password: 'Password is invalid' });
	}	

	
	if(errors.length > 0){
		res.status(400).json({error: errors});
	}

	next();
}

auth.signin = (req, res, next) => {
	const { nick, password } = req.body;
	const errors = [];

	if(typeof nick === 'undefined' || typeof password === 'undefined'){
		errors.push({error: 'Invalid Credentials'});
	}

	if(errors.length > 0){
		res.status(400).json({error: errors});
	}

	next();
}

export default auth;