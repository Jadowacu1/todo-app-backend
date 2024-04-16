import { Request, Response } from 'express';
import {tasks} from '../models/usersSchema';
import  mongoose from 'mongoose';

const createTask = async (req: Request, res: Response) => {
    try {
        const email = req.user;
        const {taskName}  = req.body;
        const existingTask = await tasks.findOne({email});
        const task = await tasks.findOne({ email, taskName: { $in: [taskName] } });
        if(task){
        return res.status(409).json("The task already exists");
        }
        else if(existingTask){
            const update = await tasks.updateOne({email}, {$push:{taskName: taskName}})
            return res.status(200).json("Task is Added");  
        }
        else{
        const createTask = await tasks.create({email,taskName});
        return res.status(200).json("The Task is Added"); 
        }
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).send('Internal server error');
    }
};
export default createTask;
