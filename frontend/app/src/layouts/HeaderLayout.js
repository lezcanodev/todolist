import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';

import './header.css';

export default ({ user }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		document.cookie = `token=; path=/; Expires=0`;
		navigate('/auth/signin');
	}

	return 	<header className='header'>
			<div className='header__user'>
				welcome {user.nick}
			</div>
			<div className='header__logout'>
				<AiOutlineLogout onClick={handleLogout}/>
			</div>
			
		</header>
}