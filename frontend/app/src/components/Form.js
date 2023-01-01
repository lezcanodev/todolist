import './form.css';

export default (props) => {

	return 	<form className='form' {...props}>
			<div className='form__block form__block--title'>
				<h4 className='form__title'>{ props.title }</h4>
			</div>
			{props.children}
			<div className='form__block form__block--submit'>
				{ props?.links }
				<button type='submit' className='btn btn--form'>
					{ props.labelsubmit }
				</button>
			</div>
		</form>
}