import { Request, Response } from "express";
import userValidation from "../../../utilities/input";
import {
  fetchExistingTask,
  emailBasedTask,
  addingTask,
  pushingTask,
  viewAllTask,
  deleteTask,
  updateTask,
  findSingleTask,
} from "../repository/todoRepository";
const createTask = async (req: Request, res: Response) => {
  try {
    const email: any = req.user;
    const { taskName } = req.body;
    const existingTask = await fetchExistingTask(email);
    const task = await emailBasedTask(email, taskName);
    if (task) {
      return res.status(409).json("The task already exists");
    } else if (existingTask) {
      const update = await pushingTask(email, taskName);
      return res.status(200).json("Task is Added");
    } else {
      const creatingTask = addingTask(email, taskName);
      return res.status(200).json("Task is created");
    }
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).send("Internal server error");
  }
};
const viewTask = async (req: Request, res: Response) => {
  try {
    const email: any = req.user;
    const tasks = await viewAllTask(email);
    return res.status(200).json(tasks[0].taskName);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).send("Internal server error");
  }
};
const deletingTask = async (req: Request, res: Response) => {
  const { taskName } = req.params;
  const email = req.user;
  try {
    const result = await deleteTask(email, taskName);
    if (!result) {
      return res.status(404).json("Task not found");
    }
    return res.status(200).json(`Task '${taskName}'is deleted successfully'`);
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};
const updatingTask = async (req: Request, res: Response) => {
  try {
    const { taskName } = req.params;
    const { updatedTaskName } = req.body;
    const email = req.user;

    const result = await updateTask(email, taskName, updatedTaskName);
    if (!result) {
      return res.status(404).json("Task not found or not updated");
    }

    return res.status(200).json(`Task '${taskName}' is updated successfully`);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchTask = async (req: Request, res: Response) => {
  try {
    const email = req.user;
    const { taskName } = req.params;

    const task = await findSingleTask(email, taskName);

    if (!task) {
      return res.status(404).json(`${taskName} is not found in the task`);
    }
    const selectedTask = task.taskName.find((Element) => Element === taskName);

    if (!selectedTask) {
      return res.status(404).json(`${taskName} value not found in the task`);
    }

    res.status(200).json(selectedTask);
  } catch (error) {
    console.error("Error searching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createTask, viewTask, deletingTask, updatingTask, searchTask };
