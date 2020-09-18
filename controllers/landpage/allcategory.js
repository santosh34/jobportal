var moment = require('moment'); 
const mongoose = require('mongoose')
var User = require('../../model/user');
var PostJob=require('../../model/postjob');

module.exports.getAllCategoryPage =(req,res,next)=>{
   const pipeline=[
       {$group:{_id:"$jobbycategory",count:{$sum:1}}}]
       return PostJob.aggregate(pipeline)
       .then(result =>{
           console.log(result)
           res.render('landpage/allcategory',{title:'all category',isauth:req.session.isLoggedIn,user:req.user,result:result})


       })
       .catch(err=>{
           console.log(err)
       })
   
}

module.exports.getAllJobCategoryPage =(req,res,next)=>{
    const jobcategory=req.params.jobcategory
    PostJob.find({jobbycategory:jobcategory}).populate('postuserid')
    .then(alljob=>{
        console.log(alljob)
        res.render('landpage/jobcategory',{title:'all category',isauth:req.session.isLoggedIn,user:req.user,alljob:alljob,moment:moment})
    })
    .catch(err=>{
        console.log(err)
    })
}

