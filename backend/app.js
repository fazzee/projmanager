const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://faaizi:Y2Q5cGXxHbfmi2ti@cluster0-xsrq9.mongodb.net/mean-db?retryWrites=true", { useNewUrlParser: true })
.then(() =>{
  console.log("Connected Successfully");
})
.catch(() => {
  console.log("Connection Failed");
});

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/projects", projectRoutes);
app.use("/api/members", userRoutes);
app.use("api/tasks", taskRoutes);


module.exports = app;




