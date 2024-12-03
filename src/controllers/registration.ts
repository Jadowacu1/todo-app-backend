import  Express,{Request,Response} from "express";
import {Users} from  '../models/usersSchema';
import userValidation from '../validators/input';
import bcrypt from 'bcrypt';


const registNewUser = async(req:Request,res:Response)=>{

    const {email,Password,confirm} = req.body;
    const {error} = userValidation.validate({ email, Password, confirm});
    // this is input validation from joi
    if (error) {
        const errorMessages: string[] = [];
        error.details.forEach((detail) => {
            if (detail.type === 'string.pattern.base') {
               errorMessages.push('Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, one special character, and be between 8 and 30 characters long');
            } else {
                errorMessages.push(detail.message.replace(/['"]+/g, ''));
            }
        });
        return res.status(409).json(errorMessages);
    }
    const password = await bcrypt.hash(Password,10);

    const result = await Users.findOne({email});
    if(result){
     return res.status(409).json("The Email is In use");
    }
    const createUser = await Users.create({email,password})
    .then(data => {
        return res.status(200).json("Account Created Successfully");
    })
}
export {registNewUser};