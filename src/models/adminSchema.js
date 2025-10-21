import mongoose from "mongoose";

const AdminAuth = new mongoose.Schema(
    {
        email:{
            type:string,
        },
        password:{
            type:string
        }
    }
)
const AuthAdmin = mongoose.model("admin",AdminAuth)
export default AuthAdmin