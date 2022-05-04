const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
      
    name:{
        type:String,
        required:"college name is required",
        unique : true
    },
    fullName:{
        type:String,
        required:"college fullName is required",
    },
    logoLink:{
        type:String,
        required:"logoLink is required",
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

    // { name: { mandatory, unique, example iith }, fullName: { mandatory, example `Indian Institute of Technology, Hyderabad` }, logoLink: { mandatory }, isDeleted: { boolean, default: false } }

})

module.exports = mongoose.model('college', collegeSchema)