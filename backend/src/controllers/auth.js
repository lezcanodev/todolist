import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const signup = async  (req, res, next) => {
	try{
		const {nick, password} = req.body;
		const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
	
		const user = await User.create({
			nick, passwordHash
		});

		res.status(201).json({ msg: 'Created' });
	}catch(error){
		next(error);
	}
}


const signin = async (req, res, next) => {
	try{
		const {nick, password} = req.body;
		const user = await User.findOne({nick});
		
		if(!user){
			res.status(200).json({ error: 'Invalid credentials' });
			return;
		}	

		const match = await bcrypt.compare(password, user.passwordHash);		

		if(!match){
			res.status(200).json({ error: 'Invalid credentials' });
			return;
		}	
		
		user.passwordHash = undefined;
		
		const token = jwt.sign({
			id: user._id,
  			nick: user.nick,
		}, process.env.JWT_SECRET, { expiresIn: '1h' }); 
		
		res.status(200).json({token});

	}catch(error){
		next(error);
	}

}

const verifyToken = async (req, res, next) => {
	const { token } = req.query;
	let isTokenValid;

	try{
	   const result = await jwt.verify(token, process.env.JWT_SECRET);
	   isTokenValid = true;	
	}catch(error){
	   isTokenValid = false;
	}

	res.status(200).json({ isTokenValid });	  
}

export {
	signup,
	signin,
	verifyToken
};