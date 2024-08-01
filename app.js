import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from




const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL



mongoose.connect(MONGOURL).then(()=>{
  console.log("Database connected succesfully");
  app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
  })
}).catch((error)=>console.log(error))