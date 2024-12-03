import joi from "joi";
import mongoose,{Schema,Document,model} from "mongoose";
interface users extends Document{
    email: {type: string, required:true},
    password: string
}
interface Task extends Document {
    email: string,
    taskName: string[]
}

const taskSchema:Schema<Task> = new Schema({
    email:{type: String ,required: true},
    taskName: {type: [String]}
})
const userSchema:Schema<users> = new Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

const tasks = mongoose.model<Task>('tasks',taskSchema);  
const Users = mongoose.model<users>('Users', userSchema);
export {Users,tasks};
