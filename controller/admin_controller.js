import express from "express";
import userModel from "../model/user_model.js";
import axios from "axios";

//admin login rendering
export const getAdminLogin = async (req, res) => {
  try {
    if(!req.session.user){
      res.render("admin_login");
    }else{
      res.redirect('adminHome')
    }
  } catch (error) {
    console.log(error);
  }
};

//admin logout

export const adminLogout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session: " + err);
        return res.status(500).send("Error signing out");
      }
      res.redirect("adminlogin");
    });
  } catch (error) {
    console.log("This is an error while admin logout: " + error);
  }
};

//admin home
export const getAdminHome = async (req, res) => {
  try {
    const users = await userModel.find(); // Fetch all users from the database
    if (req.session.user) {
      res.render("admin_home", { users }); // Render the admin_home view with users data
    } else {
      res.redirect("adminlogin");
    }
  } catch (err) {
    console.error("Error fetching admin home data:", err.message);
    res.status(500).send({
      message: "Error fetching admin home data",
      error: err.message,
    });
  }
};

export const getAddUser = async (req, res) => {
  try {
    res.render("add_user");
  } catch (error) {
    console.log(error);
  }
};

//update file rendering

export const getUpdate = async (req, res) => {
  const id = req.query.id;
  console.log(id);

  try {
    
    const user = await userModel.findOne({ _id: id });

    if(req.session.user){
      res.render("update_user", { user: user });

    }else{
      res.redirect("adminlogin");
    }

   
  } catch (err) {
    console.error("Error fetching admin home data:", err.message);
    res.status(500).send({
      message: "Error fetching admin home data",
      error: err.message,
    });
  }
};

//admin login authentication
export const loginAdminAuth = async (req, res) => {
  try {
    console.log("getIn");

    const usernameAdmin = "admin";
    const adminPassword = "admin1234";

    const { username, password } = req.body;
    console.log(username);

    if (username === usernameAdmin && password === adminPassword) {
      req.session.user = {
        username: username,
      };
      res.redirect("adminHome");
    }
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      errorcode: 2,
      status: false,
      msg: "Server error",
    });
  }
};

//retrive users or retrive single user

export const getUsers = async (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    userModel
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "not found user withv" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error while  reterving with " + id });
      });
  } else {
    userModel
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Error occured while retriving" });
      });
  }
};

//

//delete user

export const deleteUser = (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete user with ID ${id}. Maybe ID is incorrect.` });
      } else {
        res.send({
          
          message: "User was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with ID = " + id,
      });
    });
};

//udate Put

export const updateUser = (req, res) => {
  console.log("Inside update user");

  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  const username = req.body.username;
  console.log(username);
  console.log("User ID:", id);
  console.log("Request Body:", req.body);

  // Test by updating one field at a time
  userModel
    .findByIdAndUpdate(
      id,
      { username: req.body.username },
      { useFindAndModify: false, new: true }
    )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).send({ message: "Error updating user information" });
    });
};

//admin register user

export const registerUserByAdmin = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        errorcode: 1,
        status: false,
        msg: "All fields are required",
      });
    }

    let user = new userModel({
      username,
      password,
      email,
      phone,
    });

    const newUser = await user.save();
    console.log("New user:", newUser);

    // Send a success response for AJAX requests
    return res.status(200).json({
      status: true,
      msg: "User created successfully",
    });

  } catch (error) {
    console.log(error.message);

    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({
        errorcode: 3,
        status: false,
        msg: "User already exists with this email or username",
      });
    }

    return res.status(500).json({
      errorcode: 2,
      status: false,
      msg: "Server error",
    });
  }
};


export const searchUser = async (req, res) => {
  try {
    // Get the search query from the request
    const searchQuery = req.query.search;

   //no search query redirect to home
    if (!searchQuery) {
      return res.redirect('/admin/adminHome');
    }

   //feathing from database
    const users = await userModel.find({
      $or: [
        { username: new RegExp(searchQuery, 'i') }, // Case-insensitive search for username
        { email: new RegExp(searchQuery, 'i') }     // Case-insensitive search for email
      ]
    });

    // searched response 
    if (req.session.user) {
      res.render("admin_home", { users }); // Render the admin_home view with the filtered users data
    } else {
      res.redirect("adminlogin"); // Redirect to the admin login page if not authenticated
    }
  } catch (err) {
    console.error("Error searching for users:", err.message);
    res.status(500).send({
      message: "Error searching for users",
      error: err.message,
    });
  }
};

