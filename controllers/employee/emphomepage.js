var User = require('../../model/user');
var PostJob = require('../../model/postjob');
var mongoose=require('mongoose')

module.exports.getEmployeeHomepage =(req,res,next)=>{

       User.findOne({_id:req.user._id}).select('id')
       .then(user=>{
          console.log(user)
          const pipeline=[
             {$match:{postuserid:new mongoose.Types.ObjectId(req.user._id)}},
             {$group:{_id:"$jobexperiencelevel",count:{$sum:1}}}]
             return PostJob.aggregate(pipeline)
             .then(result=>{
                PostJob.countDocuments({postuserid:req.user._id})
                .then(count=>{
                   //console.log(count)
                   //console.log(result)
                   res.render('employer/homepage',{title:'Home Page',user:req.user,isauth:req.session.isLoggedIn,count:count,result:result});
                })
               })
             })
       }
