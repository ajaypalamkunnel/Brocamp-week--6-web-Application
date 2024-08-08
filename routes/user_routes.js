import express from "express";
const route = express.Router();
import {
  registerUser,
  getUser,
  authUser,
  getHome,
  sigin,
  signOut,
  registerGet,
} from "../controller/user_controller.js";

//route.get('/')

route.get("/signup", registerGet);
route.get("/fetch", getUser);
route.get("/signin", sigin);
route.get("/home", getHome);
route.get("/signout", signOut);

route.post("/postsignin", authUser);
route.post("/signup", registerUser);



//when we use default export the entire content of the
//file is export some times its not safe
export default route;

//import userController from '../controller/user_controller.js';
