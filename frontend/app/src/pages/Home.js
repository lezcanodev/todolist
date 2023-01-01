import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, useModal, useTasks } from '../hooks/';  
import { getTasks } from '../api/task';
import { AiFillPlusCircle } from 'react-icons/ai';


import Header from '../layouts/HeaderLayout';

import Tasks from '../components/Tasks';
import Modal from '../components/Modal';
import CreateTask from '../components/CreateTask';
import FormSearchTask from '../components/FormSearchTask';
import FormFilterTask from '../components/FormFilterTask';

import './home.css';

let page = 1;

export default () => {
	const [	tasks, 
		setTasks,
		page, 
		setPage,
		existNextPage,
		loadingTasks, 
		setQuery, 
		filter, 
		setFilter] = useTasks();
	const [user, loading] = useUser();
	const [openCreateTask, handleOpenCreateTask, handleCloseCreateTask] = useModal();
	const [loadMoreTasks, setLoadMoreTasks] = useState(false);
	
	useEffect(() => {
		const handleScroll = function(e){
			const scrollY = window.pageYOffset;
			const heightDocument = document.body.offsetHeight;

			if(!loadMoreTasks && (scrollY + window.innerHeight > heightDocument+10) ){
				setLoadMoreTasks(true);
			}
		}
		
		window.addEventListener('scroll', handleScroll);

		return () => {
 			window.removeEventListener('scroll', handleScroll);
		}
	}, []);	

	useEffect(() => {
		if(!loadMoreTasks) return;

		if(existNextPage) setPage(page + 1);
		
		const time = setTimeout( () => setLoadMoreTasks(false), 500);
		
		return () => {
			clearTimeout(time);
		}
	}, [loadMoreTasks])	

	if(loading) return;
	if(!user) return <Navigate to='/auth/signin' replace />

	

	return <>
			<Header user={user}/>
			
			<div className='home-content'>
				<div className='home-content__filters'>
					<FormSearchTask 
						setQuery={setQuery}
					/>
					<FormFilterTask 
						setFilter={setFilter}
						filter={filter}
					/>
				</div>
				<div className='home-content__tasks'>
					<div style={{marginBottom:10, textAlign:'right'}}>
					<button className='btn btn--icon btn--inset-shadow' 
						onClick={handleOpenCreateTask}
						 >
						<AiFillPlusCircle />
					</button>
					</div>
					<Tasks 
						tasks={tasks}
						loadingTasks={loadingTasks}
						setTasks={setTasks}
					/>
				</div>
			</div>
			<Modal
				open={openCreateTask}
				handleOpen={handleOpenCreateTask}
				handleClose={handleCloseCreateTask}
			>
				<CreateTask 
					closeModal={handleCloseCreateTask}
					tasks={tasks}
					setTasks={setTasks}
				/>
			</Modal>

		</>;
}