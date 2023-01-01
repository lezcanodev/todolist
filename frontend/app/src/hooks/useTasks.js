import { useState, useEffect } from 'react';
import { getTasks } from '../api/task';

const useTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState({});
	const [page, setPage] = useState(1);
	const [existNextPage, setExistNextPage] = useState(true);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		setLoading(true);
		const get = async () => {
			try{
				const result = await getTasks(query, filter);
				setTasks(result.tasks);
				setPage(1);
				setExistNextPage(true);
			}catch(err){
				console.log("useTasks error");
			}finally{
				setLoading(false);
			}
		}
		get();
	}, [query, filter]);

	useEffect(() => {
		if(page <= 1) return;
		setLoading(true);
		const get = async () => {
			try{
				console.log(page)
				const result = await getTasks(query, { ...filter, pageQuery: page});
				setExistNextPage(result.nextPage.exist);
				setTasks((prevTasks) => prevTasks.concat(result.tasks) );
			}catch(err){
				console.log("useTasks error");
			}finally{
				setLoading(false);
			}
		}
		get();
	}, [page]);
	
	return [tasks, setTasks, page, setPage,existNextPage, loading, setQuery, filter, setFilter];
}


export { useTasks }