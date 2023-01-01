import { createRoutesFromElements ,  Route } from 'react-router-dom';
import { getTask } from '../api/task';

//Auth Elements
import AuthLayout from '../layouts/AuthLayout';
import Signin from '../pages/auth/Signin';
import Signup from '../pages/auth/Signup';

//Home element
import Home from '../pages/Home';


const routes = createRoutesFromElements(
			<>
				<Route path='/home' element={ <Home /> } />
				<Route	path='auth' 
					element={ <AuthLayout /> }>
					<Route path='signin' element={ <Signin /> } />
					<Route path='signup' element={ <Signup /> } />
				</Route>
				<Route path="*" element={<>404</>} />
			</>
		);

export { routes };