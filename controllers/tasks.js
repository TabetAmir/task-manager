const Task = require('../model/task')
const asyncWraper = require('../middleware/asyncWraper')
const { createCustomError } = require('../error/custom_error')


const getAll = asyncWraper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWraper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWraper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`there is no task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWraper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        returnDocument: 'after',
        runValidators: true
    })
    if (!task) {
        return next(createCustomError(`there is no task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWraper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return next(createCustomError(`there is no task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

module.exports = {
    getAll,
    createTask,
    getTask,
    updateTask,
    deleteTask
}