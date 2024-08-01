import express from 'express'
const route = express.Router()
import { registerUser,getUser,authUser } from '../controller/user_controller.js'

//route.get('/')

route.post('/signup',registerUser)
route.get('/fetch',getUser)
route.get('/signin',authUser)




//when we use default export the entire content of the 
//file is export some times its not safe
export default route



















//import userController from '../controller/user_controller.js';