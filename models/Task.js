import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    deadline: {
        type: Date
    },
    priority: {
        type: String
    },
    subtasks: [{
      description: String,
      status: Boolean
    }],
    status: {
        type: Boolean
    }
})

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Task = model('tasks', taskSchema)

export default Task