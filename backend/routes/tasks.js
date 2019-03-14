const taskFunctions = require("../controllers/tasks");
const checkAuth = require("../middleware/checkAuth");
const express = require("express");


const Router = express.Router();


// Routes Place here

Router.post('', checkAuth, taskFunctions.createTask);

Router.get('', checkAuth, taskFunctions.getTasks);

Router.put("/:id", checkAuth, taskFunctions.updateTask);

Router.get("/:id", taskFunctions.getTask);

Router.delete("/:id", taskFunctions.deleteTask);


module.exports = Router;
