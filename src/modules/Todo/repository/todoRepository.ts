import { tasksModel } from "../../../database/models/taskModel";

const fetchExistingTask = async (email: any) => {
  return await tasksModel.findOne({ email });
};
const emailBasedTask = async (email: any, taskName: string) => {
  return await tasksModel.findOne({ email, taskName: { $in: [taskName] } });
};

const pushingTask = async (email: any, taskName: string) => {
  return await tasksModel.updateOne(
    { email },
    { $push: { taskName: taskName } }
  );
};

const addingTask = async (email: any, taskName: string) => {
  return await tasksModel.create({ email, taskName });
};

const viewAllTask = async (email: any) => {
  return await tasksModel.find({ email });
};
const deleteTask = async (email: any, taskName: string) => {
  return await tasksModel.findOneAndUpdate(
    { email },
    { $pull: { taskName: taskName } },
    { new: true }
  );
};

const updateTask = async (
  email: any,
  taskName: string,
  updatedTaskName: string
) => {
  return await tasksModel.findOneAndUpdate(
    { email, taskName: taskName },
    { $set: { "taskName.$": updatedTaskName } },
    { new: true }
  );
};

const findSingleTask = async (email: any, taskName: string) => {
  return await tasksModel.findOne({ email, taskName: { $in: [taskName] } });
};
export {
  fetchExistingTask,
  emailBasedTask,
  addingTask,
  pushingTask,
  viewAllTask,
  deleteTask,
  updateTask,
  findSingleTask,
};
