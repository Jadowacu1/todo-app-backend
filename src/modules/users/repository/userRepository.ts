import { usersModel } from "../../../database/models/usersSchema";

const insertIntoDb = async (body: any) => {
  return await usersModel.create(body);
};

const exstingUser = async (email: string) => {
  return await usersModel.findOne({ email });
};

export { insertIntoDb, exstingUser };
