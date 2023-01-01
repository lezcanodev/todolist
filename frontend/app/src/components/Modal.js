import { createPortal } from 'react-dom';

import './modal.css';

export default ({ children, title, open, handleOpen, handleClose }) => {

	const modalRoot = document.getElementById('root-modal');
	return 	createPortal(
		<div 	className={`modal ${open ? 'modal--active' : 'modal--desactive'}`}
			onClick ={ (e) => { handleClose();}  }
		>
			<div 	className='modal__body' 
				onClick ={ (e) => { e.stopPropagation();  } }
			>
				<div className='modal__header'>
					<h4 className='modal__title'>{title ?? ''}</h4>
					<span className='btn btn--close' onClick={handleClose}>&times;</span>
				</div>
				<div className='modal__content'>
					{children}
				</div>
			</div>
	  	</div> , modalRoot)
}