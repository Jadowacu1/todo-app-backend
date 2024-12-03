import { Router, Request, Response } from "express";
import {
  createTask,
  viewTask,
  deletingTask,
  updatingTask,
  searchTask,
} from "../modules/Todo/controllers/todoControllers";

const taskRouter = Router();
taskRouter.post("/createTask", createTask);
taskRouter.get("/viewTasks", viewTask);
taskRouter.delete("/delete/:taskName", deletingTask);
taskRouter.put("/update/:taskName", updatingTask);
taskRouter.get("/search/:taskName", searchTask);
export default taskRouter;
