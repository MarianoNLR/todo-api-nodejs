import Task from '../models/Task.js'

export async function getMyTasks (req, res) {
    //TODO Filters
    
    const { userId } = req

    const taskList = await Task.find({user: userId})

    res.status(200).json({ taskList })
}

export async function getTaskById (req, res) {
    const { userId } = req
    const { taskId } = req.params
    const task = await Task.findById(taskId)

    res.status(200).json({task})
}

export async function addTask (req, res) {
    const { userId } = req
    const { title, description, deadline, priority } = req.body
    const newTask = new Task({
        user: userId,
        title,
        description,
        deadline,
        priority,
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

    const update = new Task({
        _id: taskId,
        user: userId,
        title,
        description,
        deadline,
        priority
    })

    const updated = await Task.findByIdAndUpdate(taskId, update, {new: true})

    res.status(200).json({updated})
}

export async function newSubtask (req, res) {
    const { userId } = req
    const { taskId } = req.params
    const { updateSubtasks } = req.body

    const update = await Task.findByIdAndUpdate(taskId, {subtasks: updateSubtasks}, {new: true})

    res.status(200).json({update})
}