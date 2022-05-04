const mongoose = require('mongoose')
const id = mongoose.Schema.Types.ObjectId 

const internSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"intern name is required"
    },
    email:{
        type:String,
        required:"email is required",
        unique:true,
        trim:true
    },
    mobile:{
        type:String,
        required:"mobile number is required",
        unique:true,
        trim:true
    },
    collegeId:{
        type:id,
        trim:true,
        ref:"college",
        required:"collegeId is required"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    // { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

}, { timestamps: true })

module.exports = mongoose.model('intern', internSchema)