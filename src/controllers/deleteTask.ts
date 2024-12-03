// Assuming tasks model is defined with Mongoose
import { Request,Response } from "express";
import { tasks } from "../models/usersSchema";

const deleteTask = async (req:Request, res:Response) => {
    const { taskName } = req.params;
    const email = req.user; 
    
    try {
        const result = await tasks.findOneAndUpdate(
            { email }, 
            { $pull: { taskName: taskName } },
            { new: true }
        );
        if (!result) {
            return res.status(404).json('Task not found or not deleted');
        }

        return res.status(200).json(`Task '${taskName}'is deleted successfully'`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Failed to delete task');
    }
}
export {deleteTask};

 