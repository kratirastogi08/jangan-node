const express=require('express')
const app=express()
const connectDB=require('./connection')
const userRouter=require('./routes/userRouter')
const viewPointRouter=require('./routes/viewPointRouter')
const communityRouter=require('./routes/communityRouter')
const bodyParser = require('body-parser')
const cors=require('cors')
const dotenv=require('dotenv')

dotenv.config()
connectDB()
app.use(cors())
app.use(bodyParser.json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
app.use('/api/user',userRouter)
app.use('/api/VP',viewPointRouter)
app.use('/api/community',communityRouter)
app.listen(4000)
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });