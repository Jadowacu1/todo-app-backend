import Express,{ Router,Request,Response } from "express";
import {registNewUser} from '../src/controllers/registration';
import bcrypt from 'bcrypt';
import { json } from "body-parser";
import {login} from './controllers/login'
import {connection} from '../src/config/connection'
import {validateToken} from './validators/tokenVerify'
import createTask from './controllers/task';
import cors from 'cors';
import { viewTask } from "./controllers/viewTask";
import search from "./controllers/search";
import {deleteTask} from './controllers/deleteTask';
import {updateTask} from './controllers/updateTask';
const app = Express();
app.use(cors());
app.use(Express.json())
app.post('/regist',registNewUser)
app.post('/login',login)
app.post('/createTask', validateToken, createTask)
app.get('/viewTasks',validateToken,viewTask)
app.get('/search/:taskName',validateToken,search)
app.delete('/deleteTask/:taskName',validateToken, deleteTask)
app.put('/updateTask/:taskName',validateToken, updateTask)

app.listen(3000,() => {
  connection()
  console.log("runnning on port 3000 ....");
})
