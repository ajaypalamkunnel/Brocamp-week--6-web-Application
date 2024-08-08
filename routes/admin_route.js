import express from "express";
const adminroute = express.Router();
import {
  getAdminLogin,
  loginAdminAuth,
  getAdminHome,
  getAddUser,
  getUpdate,
  getUsers,
  updateUser,
  deleteUser,
  registerUserByAdmin,
  adminLogout,
} from "../controller/admin_controller.js";
import { registerUser } from "../controller/user_controller.js";

adminroute.get("/adminlogin", getAdminLogin);
adminroute.get("/adminHome", getAdminHome);
adminroute.get("/addUser", getAddUser);
adminroute.get("/updateUserget", getUpdate);
adminroute.get("/adminlogout", adminLogout);
adminroute.get("/getUsers", getUsers);

adminroute.post("/adminlogin", loginAdminAuth);
adminroute.post("/signup", registerUserByAdmin);
adminroute.put("/updateUser/:id", updateUser);
adminroute.delete("/deleteUser/:id", deleteUser);

export default adminroute;
