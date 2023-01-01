import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

	<App />
 
);

const rootToastify = ReactDOM.createRoot(document.getElementById('root-toastify'));
rootToastify.render(<ToastContainer />);

