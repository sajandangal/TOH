const mongoose= require('mongoose');

const villainSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    desc:{
        type:String,
        required: true
    },
    fights:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hero'
    }]
}, {timestamps:true });

module.exports = mongoose.model('Villain', villainSchema);