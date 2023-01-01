import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
	const { authorization } = req.headers;
	let token;
	if(typeof authorization?.split(' ')[1] === 'undefined'){
		token = req.query.token;
	}else{
		token = authorization?.split(' ')[1];
	}

	try{
	   const result = await jwt.verify(token, process.env.JWT_SECRET);
	   req.user = { 
		nick: result.nick,
		id: result.id
	   };
	   next();
	}catch(error){
		res.status(401).json({
			msg: 'Unauthorized'
		});
	}
}

export {
	isAuth
}