const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  addedDate: {
    type: Object,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true
  }
});

module.exports = mongoose.model("Project", projectSchema);
