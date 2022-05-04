const { default: mongoose } = require("mongoose")
const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")
const validateEmail = require('email-validator')

const isValidReqBody = function(reqBody){
    return Object.keys(reqBody).length >0
}
const isValid = function(value){
    if(typeof value ==='undefined'||typeof value === null) return false;
    if(typeof value === 'string'&& value.trim().length ===0) return false;
    return true
}
const isValidObjectId = function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
}
const validPhone = function(mobile){
    return mobile.trim().length >9 && mobile.trim().length <11
}

let createIntern = async function(req, res) {
  try{
    if(!isValidReqBody(req.body)) return res.status(400).send({status:false,msg:"Invalid parameters.Please provide intern details"})
    let{name,email,collegeId,mobile} = req.body

    if(!isValid(name)) return res.status(400).send({status:false,msg:"intern name is required"})
    if(!isValid(email)) return res.status(400).send({status:false,msg:"email is required"})
    if(!validateEmail.validate(email)) return res.status(400).send({status:false,msg:`${email} this email is not valid}`})
    if(!isValid(mobile)) return res.status(400).send({status:false,msg:"mobile number is required"})
    if(!validPhone(mobile)) return res.status(400).send({status:false,msg:"mobile number is not valid"})
    if(!isValid(collegeId)) return res.status(400).send({status:false,msg:"collegId is required"})
    if(!isValidObjectId(collegeId)) return res.status(400).send({status:false,msg:"college is not found.Give valid collegeId"})
    let duplicateMobile = await internModel.findOne({mobile})
    if(duplicateMobile) return res.status(400).send({status:false,msg:`intern exist with this mobile number ${mobile}`})
    let list = await internModel.create(req.body)
    res.status(201).send({status:true,msg:"intern created successfully",data:list})
  }catch(err){
      res.status(500).send({status:false,error:err.message})
  }
}
module.exports={
    createIntern
}