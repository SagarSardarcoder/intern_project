const collegeModel = require('../model/collegeModel');
const validUrl = require('valid-url')

const isValidReqBody = function(reqBody){
    return Object.keys(reqBody).length >0
}
const isValid = function(value){
    if(typeof value ==='undefined'||typeof value === null) return false;
    if(typeof value === 'string'&& value.trim().length ===0) return false;
    return true
}

const createCollege = async function(req, res) {
 try{
    if(!isValidReqBody(req.body)) return res.status(400).send({status:false,msg:"Invalid parameters.Please provide college details"})
    let{name,fullName,logoLink} = req.body;
    
    if(!isValid(name)) return res.status(400).send({status:false,msg:"college name is required"})
    if(!isValid(fullName)) return res.status(400).send({status:false,msg:"college fullName is required"})
    if(!isValid(logoLink)) return res.status(400).send({status:false,msg:"logoLink is required"})
    if(!validUrl.isUri(logoLink)) return res.status(400).send({status:false,msg:"logoLink url is invalid"})
    let findCollege = await collegeModel.findOne({name})
    if(findCollege) return res.status(400).send({status:false,msg:"college name is already exist"})
     let data = await collegeModel.create(req.body)
     res.status(201).send({status:true,msg:"college created successfull",data:data})
 }catch(err){
     res.status(500).send({status:false,error:err.message})
 }       
}
module.exports ={
    createCollege
}
