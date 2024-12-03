import { Request, Response } from "express";
import { tasks } from "../models/usersSchema";

const search = async (req: Request, res: Response) => {
    try {
        const email = req.user;
        const { taskName } = req.params;

        const task = await tasks.findOne({ email, taskName: { $in: [taskName] } });

        if (!task) {
            return res.status(404).json(`${taskName} is not found in the task`);
        }
        const selectedTask = task.taskName.find(Element => Element === taskName); 

        if (!selectedTask) {
            return res.status(404).json(`${taskName} value not found in the task`);
        }

        res.status(200).json(selectedTask);
    } catch (error) {
        console.error("Error searching task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default search;
