const Member = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.createUser = (req, res, next) =>{
  bcrypt.hash(req.body.password, 10).then(hash =>{
    const user = new Member({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(200).json({
        message: "User Added Successfully",
        result : result
      });
    }).catch(error =>{
      res.status(500).json({
        message: "User Already Exists"
      });
    });
  });
}

exports.loginUser = (req, res, next) => {
 let detchedUser;
 Member.findOne({email: req.body.email}).then(user => {
   if(!user){
     return res.status(401).json({
       message: "There is no Such user"
     });
   }
   fetchedUser = user;
   return bcrypt.compare(req.body.password, user.password)
 }).then(result => {
   if(!result){
     res.status(401).json({
       message: "Incorrect Password"
     });
   }
   const token =jwt.sign({email: fetchedUser.email, userId: fetchedUser._id},
    "Hamari-secret-key",
    {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
 }).catch(error => {
   return res.status(401).json({
     message: "Invalid Email or Password"
   });
 });
};
