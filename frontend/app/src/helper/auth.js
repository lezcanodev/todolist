import { verifyToken } from '../api/auth';

const isTokenValid =  async () => {
	const token = document.cookie.trim().split('token=')[1];
	const { isTokenValid } = await verifyToken(token);
	if(!isTokenValid) throw new Error('The token is invalid');
	return token;
}



export {
	isTokenValid
}