import Express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import {Users} from '../models/usersSchema';
import bycrpt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const  TOKEN_SECRET = 'NeverTrustPeople';
const login = async (req:Request,res:Response)=>{
    const {email,Password} = req.body;
    const result = await Users.findOne({email})
    if(result){
        const fetchedPassword = result.password;
        bycrpt.compare(Password,fetchedPassword, (err,results) =>{
          if(results){
            const token = jwt.sign({email,Password},TOKEN_SECRET,{expiresIn: 60 * 60})
            return res.status(200).json(token);
          }
          else{
           return res.status(409).json("Email or Password is incorrect");
          }
        })
    }
    else{
      return res.status(409).json("Email or Password is incorrect");
    }
  }
  export {login};
