import mongoose from "mongoose";

const userSchema = mongoose.Schema(

    {
        username:{
            type:String,
            required:[true,"Name is required"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"password is required"]

        },
        phone:{
            type:Number
        }
    }


)

const User = mongoose.model('User',userSchema)

export default User