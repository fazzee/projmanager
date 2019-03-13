const Project = require('../models/projects');
const checkAuth = require('../middleware/checkAuth');

exports.createProject = (req, res, next) =>{
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    addedDate: req.body.addedDate,
    creator: req.userData.userId
  });
  project.save().then(createdProject =>{
     res.status(201).json({
       message: 'Project Added Successfully',
       project: {createdProject}
     });
  }).catch(error => {
       res.status(501).json({
       message: 'Project is not added...Try Again'
       });
  });
};

exports.getProjects = (req, res, next) => {
  Project.find().then(fetchedProjects => {
    res.status(200).json({
      message: "Projects Fetched Successfully",
      projects: fetchedProjects
    });
  }).catch(error => {
      res.status(501).json({
        message: "Projects are not loaded correctly"

    });

  });
}

exports.updateProject = (req, res, next) => {
  const project = new Project({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    addedDate: req.body.addedDate,
    creator: req.userData.userId
  });
  Project.updateOne({_id: req.params.id, creator: req.userData.userId}, project).then(result =>{
   if(result.n > 0){
     res.status(200).json({
       message: "Project Updated Successfully"
     })
   }else{
     res.status(401).json({
       message: "Unknown Error"
     });
   }
  }).catch(error =>{
    res.status(501).json({
      message: "Project Updation Failed"
    })
  });
}


exports.getProject = (req, res, next) => {
  Project.findById(req.params.id).then(project => {
    if(project){
      res.status(200).json(project);
    }else{
      res.status(404).json({
        message: "Project is not found",
      });
    }
  }).catch(error =>{
    res.status(501).json({
      message: "Project Fetching is Failed"
    });
  });
}


exports.deleteProject = (req, res, next) => {
  Project.deleteOne({_id: req.params.id}).then(result =>{
    if(result.n > 0){
      res.status(200).json({
        message: "Post Deleted Successfully"
      });
    }else{
      res.status(401).json({
        message: "User is not Authorized"
      });
    }
  }).catch(error => {
    res.status(501).json({
      message: "Post Deleteion failed"
    });
  });
}
