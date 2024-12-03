import Router from "express";
import {
  createUser,
  login,
} from "../modules/users/controllers/userControllers";

const usersRouter = Router();
usersRouter.post("/registration", createUser);
usersRouter.post("/login", login);

export default usersRouter;
