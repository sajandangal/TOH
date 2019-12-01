const express = require('express');
const Villain = require('../models/villains');

const router = express.Router();

router.route('/')
    .get((req, res,next) => {
        Villain.find({})
           .then((villains) => { 
                res.json(villains);
            }).catch((err)=> next(err));
          
    })
    .post((req, res,next) => {
        Villain.create(req.body)
            .then((villains) => {
                res.statusCode = 201;
                res.json(villains);
            }).catch(next);//similar as line 11
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json("Method not supported");
    })
    .delete((req, res,next) => {
        Villain.deleteMany({})
            .then((reply) => {
                res.json(reply);
            }).catch(next);
    });

////////////////////////////// // populate- show the tasks under category in details 

    router.route('/:id')
    .get((req, res,next) => {
        Villain.findById(req.params.id)
       
        .populate({
            path : 'fights',
            select : 'name'
        })
            .then((villains) => {
                if(villains == null) throw new Error("Villain not Found!");
                res.json(villains);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json("Method not allowed");
    })
    .put((req, res,next) => {
        Villain.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((reply) => {
                if(reply == null) throw new Error("Category not found!");
                res.json(reply);
            }).catch(next);
    })
    .delete((req, res,next) => {
        Villain.findByIdAndDelete(req.params.id)
            .then((reply) => {
                if(reply == null) throw new Error("Category not found!");
                res.json(reply);
            }).catch(next);
    });
module.exports = router;