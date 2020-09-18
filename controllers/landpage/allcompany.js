var moment = require('moment'); 
const mongoose = require('mongoose')
var User = require('../../model/user');
var PostJob=require('../../model/postjob');

module.exports.getAllCompanyPage =(req,res,next)=>{
User.find({})
.then(allcompany=>{
    //console.log(allcompany)
    res.render('landpage/allcompany',{title:'all company',isauth:req.session.isLoggedIn,user:req.user,allcompany:allcompany})
})
.catch(err =>{
    console.log(err)
})


}
module.exports.getAllCompanyPostJob=(req,res,next) => {
    const userid=req.params.userid
    PostJob.find({postuserid:userid}).populate('postuserid')
    .then(alljob=>{
        console.log(alljob)
        res.render('landpage/companyjob',{title:'all company',isauth:req.session.isLoggedIn,alljob:alljob,moment:moment})
          
       
         
     })
    .catch(err=>{
        console.log(err)
    })
}