import Express,{ Request,Response } from "express";
import { tasks } from "../models/usersSchema";
const viewTask = async (req:Request, res:Response)=> {
    const email = req.user;
    const task = await tasks.find({email})
    .then(data=>{
        return res.status(200).json(data[0].taskName)
    })
    .catch(err=>{
        return res.json(err);
    })
}
export {viewTask};