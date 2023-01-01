import { useState } from 'react';
import { AiOutlineCheckSquare, AiFillCheckSquare } from 'react-icons/ai';
import { completeObjective } from '../api/task';

import './objective.css';

export default ({objective, taskId}) => {
	
	const [ completed, setCompleted ] = useState(objective.completed);

	const handleCompleteObjetive = async () => {
		const result = await completeObjective(taskId, objective._id);
		setCompleted(result.completed);
	}

	return	<div className='task-objective' onClick={ handleCompleteObjetive }>
			<div >
				{ completed ? <AiFillCheckSquare /> : <AiOutlineCheckSquare /> }
			</div>
			<div>
				{ objective.objective }
			</div>
		</div>
}