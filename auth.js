const User = require('./models/users');
function auth(req, res,next){
    console.log(req.headers);
    let authHeader= req.headers.authorization;
    if(!authHeader){
        let err= new Error("Auth header not set");
        res.setHeader("WWW-Authentication","Basic");
        err.status=401;
        return next(err);
    }
    let auth=new Buffer.from(authHeader.split(' ')[1], "base64")
    .toString().split(":");
    User.findOne({username: auth[0]})
    .then((user)=>{
        if(user === null){
            let err = new Error("Username does not exists!");
            err.status=403;
            next(err)
        } else if(user.password !== auth[1]){
            let err = new Error("Password does not match!");
            err.status=403;
            next(err)
        }
        req.user=user;
        next();
    }).catch(next);

    // if (auth[0]=='admin' && auth[1]==='admin' ){
    //     next();
    // }
    // else{
    //     let err= new Error("Auth Header not set");
    //     res.setHeader("WWW_Authentication","Basic");
    //     err.status=401;
    //     return next(err);
    // }
}
module.exports=auth;