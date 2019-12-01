const express = require('express');
const User  = require('../models/users');
const router = express.Router();

router.post('/signup',(req, res, next)=>{
    User.create(req.body)
        .then((user)=>{
            res.json({ status: "SignUp success",user: user.username});
        })
        .catch(next);
});

module.exports=router;