import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import pkg from 'body-parser'
import cookieParser from 'cookie-parser'
import connectDB from './database/db.js';
import userRoutes from './routes/user.routes.js'

dotenv.config({}); //this is necessary as it automatically detects the enviroment variable present in the file. 
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
const { urlencoded } = pkg
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }))
app.use(cors(corsOptions))

// API'S
app.use('/api/v1/user', userRoutes)
// http://localhost:5173/api/v1/user/register(or login or logout)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
