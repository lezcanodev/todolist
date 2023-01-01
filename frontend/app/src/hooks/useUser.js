import { useState, useEffect } from 'react';
import { isTokenValid } from '../helper/auth';

const useUser = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const getUser = async () => {
			try{
				const token = await isTokenValid();
				const payload = token.split('.')[1];
				const user = atob(payload);
				setUser(JSON.parse(user));
			}catch(err){
				console.log(err);
			}finally{
				setLoading(false);
			}
		}
		getUser();
	}, []);

	return [user, loading];	
}

export { useUser };