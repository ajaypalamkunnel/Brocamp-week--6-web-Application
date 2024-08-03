import express from 'express'
import userModel from '../model/user_model.js'



export const getAdminLogin = async (req,res)=>{
    try{
        res.render('admin_login')

    }catch(error){
        console.log(error);

    }
}
export const getAdminHome = async (req,res)=>{
    try{
        res.render('admin_home')

    }catch(error){
        console.log(error);
    }
}

export const getAddUser = async (req,res)=>{
    try {
        res.render('add_user')
    } catch (error) {
        console.log(error);
        
        
    }
}


export const getUpdate = async (req,res)=>{
    try {
        res.render('update_user')
    } catch (error) {
        console.log(error);
    }
}



export const loginAdminAuth = async(req,res)=>{
    try {
        const usernameAdmin = "admin"
        const adminPassword = "admin1234"

        const {username,password}=req.body;

        if(username === usernameAdmin && password === adminPassword){
            req.session.user = {
                username:username
            }
        }


        
    } catch (error) {
        console.error("Error: ", error.message);
        return res.status(500).json({
          errorcode: 2,
          status: false,
          msg: "Server error",
        });
      } 
}

//retrive user

export const  getUsers = async (req,res)=>{

    userModel.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Error occured while retriving"})
    })

}


//delete user

export const deleteUser = (req,res)=>{

}


//udate Put

export const updateUser = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update cannot be empty" });
    }

    const id = req.params.id;
    console.log('User ID:', id);
    console.log('Request Body:', req.body);

    // Test by updating one field at a time
    userModel.findByIdAndUpdate(id, { username: req.body.username }, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with id=${id}. Maybe user not found!` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            console.error('Error updating user:', err);
            res.status(500).send({ message: "Error updating user information" });
        });
};
