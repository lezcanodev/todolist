import { parseDate } from '../helper/functions';
import Objective from './Objective';

import './showTask.css';

export default  ({task}) => {
	if(!task) return;
	
	return 	<div className='show-task'>
			<div className='show-task__title-container'>
				<h4 className='show-task__title'>{ task.title }</h4>
			</div>
			<div className='show-task__dates'>
				<span><b>Started at:</b> { parseDate(task.startedAt) }</span>
				<span><b>Finished at:</b> {task.completed ? parseDate(task.finishedAt) : 'still...'}</span>
			</div>
			<div className='show-task__objs'>
				{ task.objectives?.map(obj => <Objective	objective={obj} 
										key={obj._id} 
										taskId={task._id}/> ) }
			</div>			
		</div>
}