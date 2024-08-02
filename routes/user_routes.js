import express from 'express'
const route = express.Router()
import { registerUser,getUser,authUser,getHome,sigin,signOut,registerGet } from '../controller/user_controller.js'

//route.get('/')

route.post('/signup',registerUser)
route.get('/signup',registerGet)
route.get('/fetch',getUser)
route.post('/postsignin',authUser)
route.get('/signin',sigin)
route.get('/home',getHome)
route.get('/signout',signOut)




route.get('')


//when we use default export the entire content of the 
//file is export some times its not safe
export default route



















//import userController from '../controller/user_controller.js';