const express = require('express');
const Hero=require('../models/heroes');

const router = express.Router();

router.route('/')
    .get((req,res,next)=>{
        Hero.find({})
            .then((heroes)=>{
          res.json(heroes);
          }).catch(next);
    })
    .post((req,res,next)=>{
        Hero.create(req.body)
         .then((heroes)=>{
         res.statusCode=201;
          res.json(heroes);
         }).catch(next);
    })


    .put((req, res)=>{
        res.statusCode=405;
         res.send("Method not supported");
        
    })

    .delete((req, res,next)=>{
        Hero.deleteMany({})
        .then((reply)=>{
            res.json(reply);
         }).catch(next);
    });


/////////////////////////////////////////

    router.route('/:id')
    .get((req,res,next)=>{
        Hero.findById(req.params.id)
        .then((heroes)=>{
            if(heroes == null) throw new Error("Heroes not Found!");
            res.json(heroes);
        }).catch(next);   

    })


    .post((req,res)=>{
       res.statusCode=405;
       res.send("Method not allowed");

    })


    .put((req, res,next)=>{
        Hero.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true})
        .then((reply)=>{
            if(reply == null) throw new Error("Heroes not found!");
            res.json(reply);
        }).catch(next);
        
    })

    .delete((req, res)=>{
        Hero.findByIdAndDelete(req.params.id)
        .then((reply)=>{
            if(reply == null) throw new Error("Heroes not found!");
            res.json(reply);
        }).catch(next);
    });

//////////////////////////////////

router.route('/:id/comments')
.get((req, res,next) => {
  Hero.findById(req.params.id)
  .then((heroes)=>{
      res.json(heroes.comments);
  })
  .catch(next);
})

.post((req, res,next) => {
    Hero.findById(req.params.id)
    .then((heroes)=>{
        heroes.comments.push(req.body);
        heroes.save()
        .then((heroes)=>{
            res.json(heroes.comments);
        })
        .catch(next);
    })
    .catch(next);
  
})
.put((req, res) => {
    res.statusCode = 405;
    res.json("Method not allowed");
})
.delete((req, res,next) => {
  Hero.findById(req.params.id)
  .then((heroes)=>{
      heroes.comments=[];
      heroes.save()
      .then((heroes)=>{
          res.json(heroes.comments);
      })
      .catch(next);
  })
  .catch(next);
});

/////////////////////////////////////////
router.route('/:id/comments/:nid')
.get((req,res,next)=>{
    Hero.findById(req.params.id)
    .then((heroes)=>{
        let comment = heroes.comments.id(req.params.nid);
        res.json(comment);
    })
    .catch(next);
})
.post((req,res)=>{
    res.statusCode = 405;
    res.json({message:"Method not allowed"});
})
.put((req,res,next)=>{
    Hero.findByIdAndUpdate(req.params.id)
    .then((heroes)=>{
        let comment= heroes.comments.id(req.params.nid);
        comment.comment=req.body.comment;
        heroes.save()
        .then(()=>{
            res.json(heroes.comments)
        })
        .catch(next);
    })
    .catch(next);
})
.delete((req,res,next)=>{
    Hero.findById(req.params.id)
    .then((heroes)=>{
        heroes.comments.pull(req.params.nid);
        heroes.save()
        .then((heroes)=>{
            res.json(heroes.comments);
        })
        .catch(next);
    })
    .catch(next);

})


    module.exports= router;