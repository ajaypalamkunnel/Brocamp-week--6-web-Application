import express from 'express'
const adminroute = express.Router();
import {getAdminLogin} from '../controller/admin_controller.js'


adminroute.get('/adminlogin',getAdminLogin)

export default adminroute