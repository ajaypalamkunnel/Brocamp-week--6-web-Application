import express from 'express'
const adminroute = express.Router();
import {getAdminLogin,loginAdminAuth,getAdminHome,getAddUser,getUpdate,getUsers,updateUser,deleteUser,registerUserByAdmin} from '../controller/admin_controller.js'
import {registerUser} from '../controller/user_controller.js'

adminroute.get('/adminlogin',getAdminLogin)
adminroute.post('/adminlogin',loginAdminAuth)
adminroute.get('/adminHome',getAdminHome)
adminroute.get('/addUser',getAddUser)
adminroute.get('/updateUserget',getUpdate)



adminroute.post('/signup',registerUserByAdmin)
adminroute.get('/getUsers',getUsers)
adminroute.put('/updateUser/:id',updateUser)
adminroute.delete('/deleteUser/:id',deleteUser)

export default adminroute