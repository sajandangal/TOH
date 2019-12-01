const express=require("express");
const mongoose=require("mongoose");
const testRouter = require('./routes/heroes');
const villainRouter = require('./routes/villains');
const url='mongodb://localhost:27017/tohdb';
const PORT=3000;
const app=express();
app.use(express.json()); //for reading datas coming from post request
app.use(express.static(__dirname+ "/public"));

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
    .then((db)=>{
        console.log("Sucessful Connection with MongoDB server");
},(err)=> console.log(err));


app.use('/heroes',testRouter);
app.use('/villains',villainRouter);


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.statusCode=500;
    //res.send("Something is Wrong !!");
    res.json({ message: err.message });
});
app.listen(PORT, ()=>{
    console.log(`App is running at localhhost:${PORT}`);
});

