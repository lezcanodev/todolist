import validator from 'validator';
import authValidator from './auth.js';
import taskValidator from './task.js';

validator.auth = authValidator;
validator.task = taskValidator;

export default validator;