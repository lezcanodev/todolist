import {useState} from 'react';

const useInput = (defaultValue = '') => {
	const [value, setValue] = useState(defaultValue);
	
	const handleValue = (e) => {
		setValue(e.target.value)
	}
	
	return [value, handleValue, setValue];
}

export {useInput}