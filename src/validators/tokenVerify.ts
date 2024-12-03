import jwt from 'jsonwebtoken';
import express,{Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}
const  TOKEN_SECRET = 'NeverTrustPeople';
const validateToken = async (req:Request, res:Response, next:NextFunction) =>{
    try{
     const authHeader:any = req.headers.authorization;
     const token = authHeader.split(" ")[1];
    const verifyToken:any = await jwt.verify(token,TOKEN_SECRET);
     if(verifyToken){
        req.user = verifyToken.email;
        next();
     }
    }   
    catch(err:any){
        return res.status(500).json({error:err.message});
    }   
}
export {validateToken};
