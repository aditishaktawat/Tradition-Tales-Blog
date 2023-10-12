import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';
dotenv.config();

const app = express()

app.use(cors(
  {
    origin: ["https://Tradition-Tales-Blog.vercel.app"],
    methods: ["POST" , "GET"],
    credentials: true
  }
));

mongoose.connect('mongodb+srv://aditi:1234ad@merncluster.5km0ode.mongodb.net/test?retryWrites=true&w=majority&appName=AtlasApp');

app.use(bodyParser.json({ extended: true}))
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/', Router);


const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`))

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);
