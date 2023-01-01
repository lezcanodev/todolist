import InputText from '../../components/InputText';
import InputPassword from '../../components/InputPassword';
import { useNavigate, Link  } from 'react-router-dom';
import { signin } from '../../api/auth'; 


import Form from '../../components/Form';
import FormInputBlock from '../../components/FormInputBlock';

export default () => {
	const navigate = useNavigate();

	const handleSignin = async (e) => {
		e.preventDefault();
		const form = e.target;
		const data = new FormData(form);
		
		const result = await signin({
					nick: data.get('nick'),
					password: data.get('password')
				});
		
	
		if(result.error){
			console.log(result);
		}else{
			const { token } = result;
			document.cookie = `token=${token}; path=/`; 
			navigate('/home');
		}

	} 	

	return <Form 	onSubmit={(e) => handleSignin(e)}
		      	title='Login'
		    	labelsubmit='Sign in'
			links={<Link to='/auth/signup' 
				     style={{ color:'#fff', borderBottom:'1px solid #fff', marginRight:10 }}			>register</ Link>}
			style={{maxWidth:300}}>
				<FormInputBlock
					label='Nick'
				>
					<InputText name='nick' placeholder='Nick' />
				</FormInputBlock>
				
				<FormInputBlock
					label='Password'
				>
					<InputPassword name='password' placeholder='Password' />
				</FormInputBlock>				
		</Form>
}