import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import nocache from 'nocache';
import dotenv from "dotenv";
import userRoutes from './routes/user_routes.js'
import session from "express-session"


dotenv.config(); // Load environment variables from
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL

const app = express();
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use((session({
  secret: 'adfdfd343sdf',
  resave:false,
  saveUninitialized:false
})))

app.set("view engine","hbs")
app.use(nocache());
app.use('/test',(req,res)=>{
  res.render("signup")
})
app.use('/signin',(req,res)=>{
  res.render('signin')
})
app.use('/signup',(req,res)=>{
  res.render('signup')
})



app.use('/user',userRoutes)

mongoose.connect(MONGOURL).then(()=>{
  console.log("Database connected succesfully");
  app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
  })
}).catch((error)=>console.log(error))