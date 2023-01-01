import { toast } from 'react-toastify';
import { createTask } from '../api/task';
import InputText from './InputText';
import Textarea from './Textarea';
import Form from './Form';
import FormInputBlock from './FormInputBlock';



export default ({closeModal, tasks, setTasks}) => {

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);

		const result = await toast.promise(
			createTask({
				title: form.get('title'),
				objectives: form.get('objectives')
			}),
			{
      				pending: 'saving...',
      				success: 'saved!!',
      				error: 'Error!!'
    			},
			{ 
				theme:'dark' 
			}
		);
	
		if(result?.task){
			setTasks((prevTasks) => [result.task].concat(prevTasks));
		}

		closeModal();

	}

	return	<>
		<Form 	onSubmit={(e) => handleSubmit(e)}
		      	title='Create Task'
		    	labelsubmit='Create'>
				<FormInputBlock
					label='Title'
				>
					<InputText name='title' placeholder='Title' />
				</FormInputBlock>
				
				<FormInputBlock
					label='Objectives'
				>
					<Textarea name='objectives' placeholder='Presione enter para agregar otro objetivo' />
				</FormInputBlock>				
		</Form>
		</>;	
}