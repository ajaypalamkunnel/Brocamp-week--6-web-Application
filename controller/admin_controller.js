import express from 'express'

export const getAdminLogin = async (req,res)=>{
    try{
        res.render('admin_login')

    }catch(error){
        console.log(error);

    }
}