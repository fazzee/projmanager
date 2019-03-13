const projectFunctions = require('../controllers/projects');
const checkAuth = require("../middleware/checkAuth");

const express = require("express");

const Router = express.Router();

Router.post('', checkAuth, projectFunctions.createProject);

Router.get('', projectFunctions.getProjects);

Router.put("/:id", checkAuth, projectFunctions.updateProject);

Router.get("/:id", projectFunctions.getProject);

Router.delete("/:id", projectFunctions.deleteProject);






module.exports = Router;
