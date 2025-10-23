import joi from "joi"

 export const authSchema = joi.object({
    name:joi.string().required(),
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(3).required(),
    number:joi.number()
})
