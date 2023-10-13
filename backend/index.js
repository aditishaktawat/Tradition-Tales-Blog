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
    origin: ["https://tradition-tales-blog-front.vercel.app"],
    methods: ["POST" , "GET", "HEAD", "DELETE", "PUT", "PATCH"],
    credentials: true
  }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', Router);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`))

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

 const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@merncluster.5km0ode.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

Connection(URL);
