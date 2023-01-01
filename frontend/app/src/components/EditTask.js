import { toast } from 'react-toastify';
import { editTask } from '../api/task';
import { parseObjectives } from '../helper/functions';
import InputText from './InputText';
import Textarea from './Textarea';
import Form from './Form';
import FormInputBlock from './FormInputBlock';


export default ({task, setTasks}) => {
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);

		const result = await toast.promise(
			editTask({
				taskId: form.get('taskId'),
				title: form.get('title'),
				objectives: form.get('objectives')
			}),
			{
      				pending: 'Editing...',
      				success: 'Edited!!',
      				error: 'Error!!'
    			},
			{ 
				theme:'dark' 
			}
		);
		
		if(result?.task){
			setTasks((prevTasks) => {
				return prevTasks.map( (t) => {
					if(t._id === task._id){
						return result.task;
					}
					return t;
				});

			
			});
		}
	}


	return <Form 	onSubmit={(e) => handleSubmit(e)}
		      	title={`Edit  ${task?.title}`}
		    	labelsubmit='Edit'>
				<input type="hidden" name="taskId" value={task?._id ?? ''} />
				<FormInputBlock
					label='Title'
				>
					<InputText name='title' placeholder='Title' value={task?.title ?? ''}/>
				</FormInputBlock>
				
				<FormInputBlock
					label='Objectives'
				>
					<Textarea name='objectives' 
						  placeholder='Presione enter para agregar otro objetivo'
						  value={ parseObjectives(task?.objectives ?? '') }
					/>
				</FormInputBlock>				
		</Form>;
}