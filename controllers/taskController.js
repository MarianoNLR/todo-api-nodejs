import Task from '../models/Task.js'

const PRIORITY = {
    0: 'low',
    1: 'mid',
    2: 'high'
}

export async function getMyTasks (req, res) {
    //TODO Filters
    const { userId } = req
    const { orderBy } = req.query
    let taskList = []
    if (orderBy === "") {
        taskList = await Task.find({user: userId}).sort({updatedAt: -1})
    } else if (orderBy === "deadline") {
        taskList = await Task.find({user: userId}).sort({deadline: 1})
    } else {
        taskList = await Task.find({user: userId}).sort({'priority.level': 1})
    }

    res.status(200).json({ taskList })
}

export async function getTaskById (req, res) {
    const { userId } = req
    const { taskId } = req.params
    try {
        const task = await Task.findById(taskId)
        
        if (!task)
            return res.status(404).json({error: 'Task not found.'})
        
        if (task.user.toString() === userId)
           return res.status(200).json({task})
        else 
           return res.status(401).json({error: 'Unauthorized'})
    } catch (error) {
        return res.status(500).json({error: 'An unexpected error has ocurred. Try again.'})
    }  
}

export async function addTask (req, res) {
    const { userId } = req
    const { title, description, deadline, priority } = req.body
    const newTask = new Task({
        user: userId,
        title,
        description,
        deadline,
        priority: {
            level: +priority,
            name: PRIORITY[+priority]
        },
        status: false,
        subtasks: []
    })
    
    await newTask.save()

    return res.status(201).json({newTask})
}

export async function update (req, res) {
    const { userId } = req
    const { taskId } = req.params
    console.log(taskId)
    const { title, description, deadline, priority } = req.body
    try {
        const task = await Task.findById(taskId)
        
        if (task.user.toString() !== userId) {
            return res.status(401).json({error: 'Unauthorized.'})
        }

        const update = new Task({
            _id: taskId,
            user: userId,
            title,
            description,
            deadline,
            priority: {
                level: +priority,
                name: PRIORITY[+priority]
            }
        })
    
        const updated = await Task.findByIdAndUpdate(taskId, update, {new: true})
    
        return res.status(200).json({updated})

    } catch (error) {
        return res.status(500).json({error: 'An unexcpected error has ocurred.'})
    }  
}

export async function newSubtask (req, res) {
    const { userId } = req
    const { taskId } = req.params
    const { updateSubtasks } = req.body
    try {
        const task = await Task.findById(taskId)

        if (task.user.toString() !== userId) {
            return res.status(401).json({error: 'Unauthorized.'})
        }
        
        const update = await Task.findByIdAndUpdate(taskId, {subtasks: updateSubtasks}, {new: true})
    
        return res.status(200).json({update})
    } catch (error) {
        return res.status(500).json({error: 'An unexpected error has ocurred. Try again'})
    }
}

export async function deleteTask (req, res) {
    const { userId } = req
    const { taskId } = req.params

    try {
        const task = await Task.findById(taskId)

        if (!task) return res.status(404).json({error: 'Task not found.'})

        if (task.user.toString() !== userId) return res.status(401).json({error: 'Unauthorized'})

        const result = await Task.findByIdAndDelete(taskId)

        return res.status(200).json({message: 'Task deleted'})
    } catch (error) {
        return res.status(500).json({error: 'An unexpected error has ocurred. Try again.'})
    }
}