import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import nocache from 'nocache';
import dotenv from "dotenv";
import userRoutes from './routes/user_routes.js'
import adminRoutes from './routes/admin_route.js'
import session from "express-session"
import flash from 'connect-flash';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config(); // Load environment variables from
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use(express.urlencoded({ extended: true   }));
app.use((session({
  secret: 'adfdfd343sdf',
  resave:false,
  saveUninitialized:false
})))

app.set("view engine","ejs")
app.use(nocache());
app.use(flash());
app.use('/test',(req,res)=>{
  res.render("signup")
})
 

app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

mongoose.connect(MONGOURL).then(()=>{
  console.log("Database connected succesfully");
  app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
  })
}).catch((error)=>console.log(error))