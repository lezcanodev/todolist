import './form.css';

export default (props) => {
	return 	<div className='form__block'>
			<label className='form__block__label'>{ props.label }</label>
			{props.children}
			<span className='form__block__error'>{ props.error }</span>	
		</div>
}