const http = require("http")
const connectToMongoDB = require("./db/dbConnection")
const { createTask, getAllTasks, getTask, editTask, deleteTask } = require("./controllers/task.controller")


require("dotenv").config({ path: `${__dirname}/config.env` })


const server = http.createServer((req, res) => {

    if (req.url === "/api/task" && req.method === "POST") {
        createTask(req, res)
    }
    else if (req.url === "/api/task" && req.method === "GET") {
        getAllTasks(req, res)
    }
    else if (req.url.match(/\/api\/task\/([0-9]+)/) && req.method === "GET") {
        getTask(req, res)
    }
    else if (req.url.match(/\/api\/task\/([0-9]+)/) && req.method === "PATCH") {
        editTask(req, res)
    }
    else if (req.url.match(/\/api\/task\/([0-9]+)/) && req.method === "DELETE") {
        deleteTask(req, res)
    }

    else {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "Not Found" }))
    }
})

connectToMongoDB()

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`http://localhost:${PORT}`))