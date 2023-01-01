import { useState } from 'react';

const styleCheckbox = {
	display: 'flex',
	gap:5,
	alignItems:'center'
}

export default ({filter, setFilter}) => {
	const [filterCompleted, setFilterCompleted] = useState(false);

	const handleFilterSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const filters = {};
		setFilter({
			completed: formData.get('filter-complete'),
			oderObjs: formData.get('filter-objectives'),
			orderDate: formData.get('filter-date')
		});
		
	}
	
	return 	<form 	onSubmit={(e) => handleFilterSubmit(e)} 
			className='form'
			style={{borderBottom:'1px solid rgba(255,255,255,.1)', paddingBottom:10}}>
			<div>
				<h4 style={{marginBottom:5}}>Task State</h4>
				<div style={{display:'flex', gap:20}}>
				<div className='form__block' style={ styleCheckbox }>
					<label 	htmlFor='complete_none'>None</label>
					<input 	id='complete_none' 
					type='radio' name='filter-complete'
					value=''/>
				</div>
				<div className='form__block' style={ styleCheckbox }>
					<label 	htmlFor='complete_completed'>Completed</label>
					<input 	id='complete_completed' 
					type='radio' name='filter-complete' value='true'/>
				</div>
				<div className='form__block' style={ styleCheckbox }>
					<label 	htmlFor='complete_incompleted'>Incompleted</label>
					<input 	id='complete_incompleted'
					type='radio' 
					name='filter-complete' 
					value='false'/>
				</div>
				</div>
			</div>
			<div style={{display:'flex', gap:20}} >
				<h4>Sort by amount of objectives</h4>
				<select name='filter-objectives'>
					<option value=''>None</option>
					<option value='ASC'>ASC</option>
					<option value='DESC'>DESC</option>
				</select>
			</div>
			<div style={{display:'flex', gap:20}} >
				<h4>Sort by started at</h4>
				<select name='filter-date'>
					<option value=''>None</option>
					<option value='ASC'>ASC</option>
					<option value='DESC'>DESC</option>
				</select>
			</div>
			<div style={{ textAlign:'right' }}>
				<button type='submit' className='btn btn--form'>Apply filter</button>
			</div>
		</form>
}