const URI = 'http://localhost:3001/api/auth/';

const signup = async ({nick, password}) => {
	try{
		const response = await fetch(`${URI}signup`, {
			method: 'POST',
			body: JSON.stringify({ nick, password }),
			headers: {
				'Content-Type' : 'application/json'
			}
		});

		const data = await response.json();	

		return data;
	}catch(err){
		
		return { error: 'ERROR!!22' };
	}
}

const signin = async ({nick, password}) => {
	try{
		const response = await fetch(`${URI}signin`, {
			method: 'POST',
			body: JSON.stringify({ nick, password }),
			headers: {
				'Content-Type' : 'application/json'
			}
		});

		const data = await response.json();	
	
		return data;
	}catch(err){
		
		return { error: 'ERROR!!' };
	}
}

const verifyToken = async (token) => {
	try{
		const response = await fetch(`${URI}verify-token?token=${token}`);
		const data = await response.json();		
		return data;
	}catch(err){
		return false;
	}
}

export { signup, signin, verifyToken }