const mongoose = require('mongoose');

const commentsSchema =new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    

},{ timestamps: true });

const heroSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    done:{
        type:Boolean,
        default: false
    },
    fights:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Villain'
    }],
    comments : [commentsSchema]
    
},{timestamps:true});

module.exports = mongoose.model('Hero', heroSchema);