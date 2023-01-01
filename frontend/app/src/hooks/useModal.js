import { useState } from 'react';

const useModal = () => {
	const [open, setOpen] = useState(false);

	const handleOpenModal = () => {
		setOpen(true);
	}	


	const handleCloseModal = () => {
		setOpen(false);
	}

	return [open, handleOpenModal, handleCloseModal];

}

export { useModal };