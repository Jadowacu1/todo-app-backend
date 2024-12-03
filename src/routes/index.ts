import Router from "express";
import usersRouter from "./usersRouter";
import taskRouter from "./todoRoutes";
import { validateToken } from "../utilities/tokenVerify";
import { connection } from "../database/config/connection";

connection();
const router = Router();
router.use("/users", usersRouter);
router.use("/tasks", validateToken, taskRouter);

export default router;
