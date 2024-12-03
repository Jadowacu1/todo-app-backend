import mongoose from "mongoose";

export const connection = async () => {
  await mongoose
    .connect("mongodb+srv://jadoForges:AMa5nuRqkdat80NG@cluster0.ilnp8i8.mongodb.net/todoApp")
    .then((result) => {
      console.log("Database is connected now");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
