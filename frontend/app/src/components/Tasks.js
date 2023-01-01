import {useState} from 'react';
import { useModal } from '../hooks';

import Task from './Task';
import Modal from './Modal';
import EditTask from './EditTask';
import ShowTask from './ShowTask';

export default ({tasks, setTasks, loadingTasks}) => {
	const [editTask, setEditTask] = useState(null);
	const [openEditTask,  handleOpenEditTask, handleCloseEditTask] = useModal();
	const [openShowTask, handleOpenShowTask, handleCloseShowTask] = useModal();
	const [showTask, setShowTask] = useState(null);

	const handleModalEditTask = (task) => {
		setEditTask(task);
		handleOpenEditTask();
	}
	
	
	if(tasks.length <= 0) return 'There arent task';

	return 	<>
		<div className='tasks' style={{width:'98%', maxWidth:600,margin:'auto'}}>
			{tasks?.map(task => ( <Task 	key={task._id} 
							task={ task }
							setTasks={ setTasks }
							handleOpenEditTask={ handleOpenEditTask }
							handleModalEditTask={ handleModalEditTask } 
							setShowTask={ setShowTask }
							handleOpenShowTask={ handleOpenShowTask }/>)) }
		</div>
		{ (loadingTasks) ? <div style={{ textAlign:'center', marginBottom:20 }}>loading...</div> : <></>}
		<Modal
			open={openEditTask}
			handleOpen={handleOpenEditTask}
			handleClose={handleCloseEditTask}
		>
			<EditTask task={editTask}
				  setTasks={setTasks}/>
		</Modal>
		
		<Modal
			open={openShowTask}
			handleOpen={handleOpenShowTask}
			handleClose={handleCloseShowTask}
		>
				<ShowTask task={showTask}/>
		</Modal>
		</>;
}