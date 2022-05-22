const Task = require("../models/taskModel")
const getBodyRequest = require("../utils/getBodyRequest")

const createTask = async (req, res) => {
    try {
        req.body = await getBodyRequest(req)
        const task = await Task.create({ ...req.body })

        res.writeHead(201, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ task }))

    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: error.message }))
    }
}


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ tasks }))

    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: error.message }))
    }
}

const getTask = async (req, res) => {
    const id = req.url.split("/")[3]
    try {
        const task = await Task.findById(id)
        if (!task) throw { statusCode: 404, message: "Task not found" }
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ task }))
    } catch (error) {
        res.writeHead(error.statusCode || 500, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: error.message }))
    }
}


const editTask = async (req, res) => {
    const id = req.url.split("/")[3]

    try {
        req.body = await getBodyRequest(req)
        console.log(req.body);
        const task = await Task.findByIdAndUpdate(id, {...req.body}, {
            new: true, runValidators: true
        })
        if (!task) throw { statusCode: 404, message: "Task not found" }


        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ task }))

    } catch (error) {
        res.writeHead(error.statusCode || 500, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: error.message }))
    }
}

const deleteTask = async (req, res) => {
    const id = req.url.split("/")[3]

    try {
        const task = await Task.findByIdAndDelete(id)

        if (!task) throw { statusCode: 404, message: "Task not found" }

        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ task }))

    } catch (error) {
        res.writeHead(error.statusCode || 500, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: error.message }))
    }
}

module.exports = {
    createTask, getAllTasks, getTask, editTask, deleteTask
}