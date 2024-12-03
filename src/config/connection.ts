import mongoose from "mongoose";

const connection = async () =>{
   await mongoose.connect("mongodb://localhost:27017/TODO")
    .then(result =>{
        console.log("Database is connected now");
    })
    .catch(err=>{
        console.log(err.message)
    })    
}
export {connection};