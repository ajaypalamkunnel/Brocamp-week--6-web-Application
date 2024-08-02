import express from 'express'
const route = express.Router()
import { registerUser,getUser,authUser,getHome } from '../controller/user_controller.js'

//route.get('/')

route.post('/signup',registerUser)
route.get('/fetch',getUser)
route.post('/signin',authUser)
route.get('/home',getHome)




//when we use default export the entire content of the 
//file is export some times its not safe
export default route



















//import userController from '../controller/user_controller.js';