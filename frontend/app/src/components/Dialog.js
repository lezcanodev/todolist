import { createPortal } from 'react-dom';
import Modal from './modal';

const dialog = (message, attrs) => {

}

const DialogContainer = ({message, open, handleAccept, handleCancel}) => {
	return  <Modal>
			<div className={`dialog ${ open ? 'dialog--active' : 'dialog--desactive'}`} >
				<p className='dialog__message'>
					{ message }
				</p>
				<div className='dialog__actions'>
					<button onClick={handleAccept} >Accept</button>
					<button onClick={handleCancel} >Cancel</button>
				</div>
			</div>

		</Modal>
}

export { DialogContainer, dialog };