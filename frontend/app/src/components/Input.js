import { useEffect } from 'react';
import { useInput } from '../hooks';

export default (props) => {
	const [value, handleInput, setValue] = useInput();

	useEffect(() => {
		setValue(props.value ?? '');
	}, [props.value])
	

	const newProps = {};
	let defaultClassName = 'input';
	newProps['className'] = defaultClassName;
	for(let prop in props){
		if(prop === 'value') continue;
		if(prop === 'component') continue;
		if(prop === 'className'){
			newProps[prop] +=  ` ${props[prop]}`;
			continue;
		}
		newProps[prop] = props[prop];
	}

	return <input value={value} 
		      onChange={handleInput} 
		      {...newProps}
		       />
}