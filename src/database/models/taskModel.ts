import mongoose,{Schema,Document,model} from "mongoose";


interface Task extends Document {
    email: string,
    taskName: string[]
}

const taskSchema:Schema<Task> = new Schema({
    email:{type: String ,required: true},
    taskName: {type: [String]}
})

const tasksModel = mongoose.model<Task>('tasks',taskSchema); 

export {tasksModel};