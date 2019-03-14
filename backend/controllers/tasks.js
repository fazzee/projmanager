const Task = require("../models/tasks");

exports.createTask = (req, res, next) => {
  const task = new Task({
   name: req.body.name,
   taskIndex: req.body.taskIndex,
   assosiatedProject: req.body.assosiatedProject,
   board: req.body.board
  });
  task.save().then(createdTask => {
    res.status(200).json({
      message: "Task Created Successfully",
      createTask: createdTask
    });
  }).catch(error =>{
    res.status(401).json({
      message: "Task creation Failed"
    });
  });
}

exports.getTasks = (req, res, next) =>{
  Task.find().then(fetchedtasks =>{
    res.status(200).json({
      message: "tasks fetched Successfully",
      tasks: fetchedtasks
    });
  }).catch(error =>{
    res.status(501).json({
      message: "fetching of tasks failed"
    });
  });
}


exports.updateTask = (req, res, next) =>{
  const task = new Task({
    _id: req.body.id,
    name: req.body.name,
    taskIndex: req.body.taskIndex,
    assosiatedProject: req.body.assosiatedProject,
    board: req.body.board
  });

  Task.findById({_id: req.body.id}).then(result =>{
    if(result.n > 0){
      res.status(200).json({
        message: "Task Updation Successful"
      });
    }else{
      res.status(401).json({
        message: "Task Updation Failed"
      });
    }
  }).catch(error =>{
    res.status(501).json({
      message: "Task Updation Failed due to server"
    });
  });
}



exports.getTask = (req, res, next) => {
  Task.findById(req.params.id).then(task =>{
    if(task){
      res.status(200).json(task);
    }else{
      res.status(404).json({
        message: "Required task is not found"
      });
    }
  }).catch(error => {
    res.status(501).json({
      message: "Task is not fetched by Server"
    });
  });
};



exports.deleteTask = (req, res, next) => {
  Task.deleteOne({_id: req.params.id}).then(result =>{
    if(result.n > 0){
      res.status(200).json({
        message: "Task is Deleted Successfully"
      });
    }else{
      res.status(404).json({
        message: "User is not authorized to perform the following tasks"
      });
    }
  }).catch(error => {
    res.status(501).json({
      message: "Task is not deleted Server error"
    })
  })
}

