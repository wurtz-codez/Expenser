import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import pkg from 'body-parser'

const app = express();
const PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
