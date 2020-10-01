//Importing
import express from "express";
import cors from 'cors';

import './db/mongoose.js';
import messageRouter from './routes/message.route.js';
import countryRouter from './routes/country.route.js';
import userRouter from './routes/user.route.js';

//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//api routes
app.use(messageRouter);
app.use(countryRouter);
app.use(userRouter);

//Listener
app.listen(port, () => console.log("Server started and listeing to ", port));
