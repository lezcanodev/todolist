import mongoose from 'mongoose';
import {Task} from './index.js';

const userSchema = new mongoose.Schema({
	nick: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'tasks'}]	
});

userSchema.statics.existNick = async function(nick) {
	const result = await this.exists({ nick });
	return result !== null;
}

const User = mongoose.model('users', userSchema);

export default User;