import express from 'express'
const route = express.Router()
import { registerUser,getUser } from '../controller/user_controller.js'

//route.get('/')

route.post('/',registerUser)
route.get('/',getUser)




//when we use default export the entire content of the 
//file is export some times its not safe
export default route



















//import userController from '../controller/user_controller.js';