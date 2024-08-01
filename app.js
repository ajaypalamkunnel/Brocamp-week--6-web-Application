import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from './routes/user_routes.js'



dotenv.config(); // Load environment variables from
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL

const app = express();
//app.use(bodyParser.json());
app.use(express.json());

app.use('/test',(req,res)=>{
  res.send("api testing................")
})

app.use('/user',userRoutes)

mongoose.connect(MONGOURL).then(()=>{
  console.log("Database connected succesfully");
  app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
  })
}).catch((error)=>console.log(error))