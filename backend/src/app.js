import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Routes from './routes/index.js';
dotenv.config({ path: path.resolve('../.env') });

const app = express();



app.use((req,res,next) => {
	res.setHeader('Access-Control-Allow-Origin' , '*');
	res.setHeader('Access-Control-Allow-Methods' , '*');
	res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');

	if(req.headers['origin'] && req.headers['access-control-request-method'] && 
	   req.headers['access-control-request-headers']){
		console.log('Preflight request');
		//res.status(204).send();
		//return;
	}	

	console.log(req.method, req.originalUrl, req.headers );
	next();
});

//Middlewares
app.use(express.json());

//Routes
app.use('/api', Routes);


//Handle Errors
app.use((err,req,res,next) => {
	console.log("Erros -> ", err);
	res.json({error: " 500 error!!! "});
})

//Start App
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const start = async () => {
	try{
		mongoose.set('strictQuery', true);
		mongoose.connect(MONGODB_URI);
		app.listen(PORT);
	}catch(err){
		console.log(err);
	}
}
start();


