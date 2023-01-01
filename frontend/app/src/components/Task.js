import { useState} from 'react';
import { parseDate } from '../helper/functions';
import { deleteTask, completedTask } from '../api/task';
import { AiFillDelete, AiFillEdit, AiOutlineCheckSquare, AiFillCheckSquare } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';

import './task.css';

export default ({task, setTasks, handleOpenEditTask, handleModalEditTask, setShowTask, handleOpenShowTask}) => {
	const [ activeConffeti, setActiveConfetti ] = useState(false);	
	const [ completeTask, setCompleteTask ] = useState(task.completed);

	const handleDelete = async (taskId) => {
		
		const result = await toast.promise(
			deleteTask(taskId),
			{
      				pending: 'Deleting...',
      				success: 'Deleted!!',
      				error: 'Error!!'
    			},
			{ 
				theme:'dark' 
			}
		);
	
		setTasks(prevTasks => {
			return prevTasks.filter(t => t._id !== task._id)
		});
		
	}

	const handleCompleteTask = async (taskId) => {
		const result = await completedTask(taskId);	
		setActiveConfetti(result.completed);
		setCompleteTask(result.completed);
		setTasks(prevTasks => {
			return 	prevTasks.filter(t => {
					if(t._id === task._id){
						t.completed = result.completed;
					}
					return t;
				})
		});
	}

	const handleShowTask = (task) => {
		setShowTask(task);
		handleOpenShowTask();
	}

	return 	<>
		<div className='task'>
			<div className='task__header'>
				<h3 	className='task__title' 
					style={{cursor:'pointer'}}
					onClick={() => handleShowTask(task)} >{ task.title }</h3>
				<span className='task__date'>{ parseDate(task.startedAt) }</span>
			</div>
			<div className='task__body'>
				{ task.objectives.length } objetives
			</div>
			<div className='task__actions'>
				<div className='task__action' onClick={ () => handleCompleteTask(task._id)  }>
					{ 
					 completeTask === true ? <AiFillCheckSquare/> : <AiOutlineCheckSquare />
					}
				</div>

				<div className='task__action' onClick={ () => handleDelete(task._id) } >
					 <AiFillDelete />
				</div>
		
				<div className='task__action'  onClick={ () => handleModalEditTask(task)} >
					 <AiFillEdit />
				</div>
			</div>
		</div>
		
		{ (activeConffeti) ? (
			<Confetti
				style={{width:'100%', 
					height:'100%', 
					top:0, 
					left:0, 
					position:'fixed'}}
				recycle={false}
				numberOfPieces={500}
				onConfettiComplete={ () => setActiveConfetti(false) }
    			/>
		   ) : (<></>)
		}

		</>
}