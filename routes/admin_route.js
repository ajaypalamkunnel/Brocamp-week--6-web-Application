import express from 'express'
const adminroute = express.Router();
import {getAdminLogin,loginAdminAuth,getAdminHome,getAddUser,getUpdate,getUsers,updateUser} from '../controller/admin_controller.js'
import {registerUser} from '../controller/user_controller.js'

adminroute.get('/adminlogin',getAdminLogin)
adminroute.post('/adminlogin',loginAdminAuth)
adminroute.get('/adminHome',getAdminHome)
adminroute.get('/addUser',getAddUser)
adminroute.get('/updateUser',getUpdate)
adminroute.post('/signup',registerUser)


adminroute.get('/getUsers',getUsers)
adminroute.put('/updateUser/:id',updateUser)

export default adminroute