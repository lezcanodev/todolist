import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../hooks';

import './auth.css';

export default () => {
	const [user, loading] = useUser();

	if(loading) return 'loading...';

	if(user){
		return <Navigate to='/' replace />
	}

	return <div id='auth-content'> <Outlet /> </div>;
}
