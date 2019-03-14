const mongoose = require('mongoose');

const boards = Object.freeze({
  Todo: 'todo',
  doing: 'doing',
  done: 'done',
});

const taskSchema = mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  taskIndex:{
    type: Number,
    required: true
  },
  assosiatedProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  boardName: {
    type: String,
    enum: Object.values(boards),
    required: true
  }
});

module.exports = mongoose.model("Task", taskSchema);
