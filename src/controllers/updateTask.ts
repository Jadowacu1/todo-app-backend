import { Request, Response } from "express";
import { tasks } from "../models/usersSchema";

const updateTask = async (req: Request, res: Response) => {
    try {
        const { taskName } = req.params;
        const { updatedTaskName } = req.body;
        const email = req.user;

        const result = await tasks.findOneAndUpdate(
            { email, 'taskName': taskName },
            { $set: { 'taskName.$': updatedTaskName } },  
            { new: true }  
        );
        if (!result) {
            return res.status(404).json('Task not found or not updated');
        }

        return res.status(200).json(`Task '${taskName}' is updated successfully`);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { updateTask };
