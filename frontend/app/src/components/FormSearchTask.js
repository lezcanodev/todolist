import { useState, useEffect } from 'react';
import Form from './Form';
import FormInputBlock from './FormInputBlock';
import InputText from './InputText';
import { AiOutlineSearch } from 'react-icons/ai';
import { getTasks } from '../api/task';
import './form.css';

export default ({setQuery}) => {
	const [search, setSearch] = useState('');
	const [debouncedSearch, setdebouncedSearch] = useState('');

	useEffect( () => {
		const timer = setTimeout( () => setSearch(debouncedSearch), 500 );
		return () => clearTimeout(timer);
	}, [debouncedSearch]);	

	useEffect( () => {
		setQuery(search);
	}, [search]);

	return 	<div className='form form--search'>
			<div className='form__block form__block--search'>
				<input 	type='search' 
					className='input' 
					placeholder='Search task'
					value={debouncedSearch}
					onInput={ (e) => setdebouncedSearch(e.target.value) }/>
			</div>
			<div className='form__block form__block--submit-search'>
				<AiOutlineSearch/>
			</div>
		</div>
}