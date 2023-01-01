import InputText from '../../components/InputText';
import InputPassword from '../../components/InputPassword';
import { useNavigate, Link  } from 'react-router-dom';
import { signup } from '../../api/auth'; 


import Form from '../../components/Form';
import FormInputBlock from '../../components/FormInputBlock';

export default () => {
	const navigate = useNavigate();

	const handleSignin = async (e) => {
		e.preventDefault();
		const form = e.target;
		const data = new FormData(form);
		
		const result = await signup({
					nick: data.get('nick'),
					password: data.get('password')
				});
		
	
		if(result.error){
			console.log(result);
		}else{
			navigate('/auth/signin');
		}

	} 	

	return <Form 	onSubmit={(e) => handleSignin(e)}
		      	title='Register'
		    	labelsubmit='Sign up'
			links={<Link to='/auth/signin' 
				     style={{ color:'#fff', borderBottom:'1px solid #fff', marginRight:10 }}					>login</ Link>}
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